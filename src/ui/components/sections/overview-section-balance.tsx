import useEconomicPlanState, {
  Act,
  Customer,
} from "@/stores/economic-plan-store";
import { sumDebtForAct } from "@/utils/debt";
import Highcharts, { Options } from "highcharts";
import { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function OverviewBalanceSection() {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <section className="grid grid-rows-subgrid gap-0 row-span-2 border rounded-lg overflow-hidden">
      <header className="bg-shb-hb2-light px-6 py-4">
        <h4 className="font-header-slab text-shb-title-7">
          Tillgångar och skulder
        </h4>
      </header>
      <div className="flex flex-col lg:flex-row bg-white">
        <div className="flex justify-center px-6 py-4 border-b lg:w-1/2 lg:border-r lg:border-b-0">
          <div className="flex h-48 w-48">
            <BalanceChart
              customers={economicPlan.customers}
              acts={economicPlan.acts}
            />
          </div>
        </div>
        <div className="px-6 py-4 lg:w-1/2">
          <BalanceChartLegend
            customers={economicPlan.customers}
            acts={economicPlan.acts}
          />
        </div>
      </div>
    </section>
  );
}

function calculateItems(customers: Array<Customer>, acts: Array<Act>) {
  const items = {
    totalAssets: 0,
    totalDebt: 0,
  };

  customers.forEach((customer) => {
    items.totalAssets += customer.assets.handelsbanken;
    items.totalAssets += customer.assets.otherBanks;
  });

  acts.forEach((act) => {
    if (act.usedInCalculations) {
      items.totalDebt += sumDebtForAct(act);
    }
  });

  return items;
}

function formatData({
  totalAssets,
  totalDebt,
}: {
  totalAssets: number;
  totalDebt: number;
}) {
  return [
    { name: "Tillgångar", y: totalAssets, color: "#043B62" },
    { name: "Skuld", y: totalDebt, color: "#42B5D7" },
  ];
}

const HIGHCHARTS_OPTIONS: Options = {
  title: undefined,
  accessibility: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  chart: {
    type: "column",
    height: null,
    width: null,
  },
  plotOptions: {
    column: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
      },
      pointWidth: 64,
      showInLegend: false,
    },
  },
  yAxis: {
    labels: {
      enabled: false,
    },
    title: undefined,
  },
  xAxis: {
    labels: {
      enabled: false,
    },
    tickLength: 0,
    lineWidth: 0,
  },
};

function BalanceChart({
  customers,
  acts,
}: {
  customers: Array<Customer>;
  acts: Array<Act>;
}) {
  const [customersUpdated] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.customersUpdated])
  );
  const [series, setSeries] = useState<SeriesOptionsType[]>([]);

  useEffect(calculateSeries, []);
  useEffect(calculateSeries, [customers, acts, customersUpdated]);

  function calculateSeries() {
    const i = calculateItems(customers, acts);
    const d = formatData(i);
    const s: SeriesOptionsType = {
      type: "column",
      name: "SEK",
      data: d,
    };
    setSeries([s]);
  }

  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  const options = {
    ...HIGHCHARTS_OPTIONS,
    series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

function BalanceChartLegendItem({ name, y, color }: BalanceLegendItem) {
  return (
    <li className="flex gap-2 text-shb-text-2">
      <div className={`h-6 w-6 rounded-lg ${color}`} />
      {name}
    </li>
  );
}

interface BalanceLegendItem {
  name: string;
  y: number;
  color: string;
}

function BalanceChartLegend({
  customers,
  acts,
}: {
  customers: Array<Customer>;
  acts: Array<Act>;
}) {
  const [items, setItems] = useState<BalanceLegendItem[]>([]);

  useEffect(calculateSeries, []);
  useEffect(calculateSeries, [customers, acts]);

  function calculateSeries() {
    const i = calculateItems(customers, acts);
    const d = [
      { name: "Tillgångar", y: i.totalAssets, color: "bg-shb-hb6" },
      { name: "Skulder", y: i.totalDebt, color: "bg-shb-hb4" },
    ];
    setItems(d);
  }

  return (
    <ul className="flex flex-wrap justify-center gap-2 h-full lg:flex-col">
      {items.map((item) => (
        <BalanceChartLegendItem
          key={item.name}
          name={item.name}
          y={item.y}
          color={item.color}
        />
      ))}
    </ul>
  );
}
