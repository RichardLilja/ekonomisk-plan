import Highcharts from "highcharts";
import { SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import {
  expensesGraphItems,
  formatExpensesGraphData,
  getExpensesGraphSeries,
  HIGHCHARTS_OPTIONS_DEFAUlT,
} from "../graphs/expenses-graph";
import useEconomicPlanState, {
  Act,
  Customer,
} from "@/stores/economic-plan-store";

export default function OverviewExpenseSection() {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <section className="grid grid-rows-subgrid gap-0 row-span-2 border rounded-lg overflow-hidden">
      <header className="bg-shb-hb2-light px-6 py-4">
        <h4 className="font-header-slab text-shb-title-7">
          Hushållets boendekalkyl
        </h4>
      </header>
      <div className="flex flex-col lg:flex-row bg-white">
        <div className="flex justify-center px-6 py-4 border-b lg:w-1/2 lg:border-r lg:border-b-0">
          <div className="flex h-48 w-48">
            <ExpenseChart
              customers={economicPlan.customers}
              acts={economicPlan.acts}
            />
          </div>
        </div>
        <div className="px-6 py-4 lg:w-1/2">
          <ExpenseChartLegend
            customers={economicPlan.customers}
            acts={economicPlan.acts}
          />
        </div>
      </div>
    </section>
  );
}

function ExpenseChart({
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
    const i = expensesGraphItems(customers, acts);
    const d = formatExpensesGraphData(i);
    const s = getExpensesGraphSeries(d);
    setSeries([s]);
  }

  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
  }

  const options = {
    ...HIGHCHARTS_OPTIONS_DEFAUlT,
    series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

function ExpenseChartLegendItem({ name, y, color }: ExpenseLegendItem) {
  return (
    <li className="flex gap-2 text-shb-text-2">
      <div className={`h-6 w-6 rounded-lg ${color}`} />
      {name}
    </li>
  );
}

interface ExpenseLegendItem {
  name: string;
  y: number;
  color: string;
}

function ExpenseChartLegend({
  customers,
  acts,
}: {
  customers: Array<Customer>;
  acts: Array<Act>;
}) {
  const [items, setItems] = useState<ExpenseLegendItem[]>([]);

  useEffect(calculateSeries, []);
  useEffect(calculateSeries, [customers, acts]);

  function calculateSeries() {
    const i = expensesGraphItems(customers, acts);
    const d = [
      { name: "Ränta", y: i.totalInterest, color: "bg-shb-hb6" },
      { name: "Amortering", y: i.totalAmortization, color: "bg-shb-hb4" },
      {
        name: "Hushållsutgifter",
        y: i.costOfLiving,
        color: "bg-shb-hb8",
      },
      {
        name: "Driftkostnader",
        y: i.operatingCost,
        color: "bg-shb-hb2-light",
      },
      { name: "Sparutrymme", y: i.savingSpace, color: "bg-shb-hb1" },
    ];
    setItems(d);
  }

  return (
    <ul className="flex flex-wrap justify-center gap-2 h-full lg:flex-col">
      {items.map((item) => (
        <ExpenseChartLegendItem
          key={item.name}
          name={item.name}
          y={item.y}
          color={item.color}
        />
      ))}
    </ul>
  );
}
