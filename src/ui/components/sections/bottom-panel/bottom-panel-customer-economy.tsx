import { SeriesOptionsType } from "highcharts";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import {
  expensesGraphItems,
  formatExpensesGraphData,
  getExpensesGraphSeries,
  HIGHCHARTS_OPTIONS_DEFAUlT,
} from "../../graphs/expenses-graph";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import OverviewExpenseSection from "../overview-section-expenses";
import OverviewBalanceSection from "../overview-section-balance";
import {
  BottomPanelSection,
  BottomPanelSubSection,
} from "../../layout/bottom-panel";
import useUserInterfaceState from "@/stores/ui-store";
import useEconomicPlanState, {
  Act,
  Customer,
} from "@/stores/economic-plan-store";

export default function CustomerEconomyBottomPanelSection() {
  const [bottomPanelSmallWidgets] = useUserInterfaceState(
    useShallow((state) => [state.bottomPanelSmallWidgets])
  );
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );
  const [savingSpace, setSavingSpace] = useState("");

  useEffect(() => {
    const i = expensesGraphItems(economicPlan.customers, economicPlan.acts);
    setSavingSpace(i.savingSpace.toString());
  }, []);

  useEffect(() => {
    const i = expensesGraphItems(economicPlan.customers, economicPlan.acts);
    setSavingSpace(i.savingSpace.toString());
  }, [economicPlan]);

  return (
    <BottomPanelSection>
      <BottomPanelSubSection>
        {!bottomPanelSmallWidgets && (
          <div className="grid grid-cols-1 gap-3 py-6 lg:py-12 lg:grid-cols-2 text-foreground">
            <OverviewExpenseSection />
            <OverviewBalanceSection />
          </div>
        )}
        {bottomPanelSmallWidgets && (
          <div className="flex justify-center items-center gap-3 py-3">
            <div className="flex w-36 h-36">
              <ExpenseChart
                customers={economicPlan.customers}
                acts={economicPlan.acts}
              />
            </div>
            <div>
              <h2 className="text-shb-title-10">Sparutrymme</h2>
              <span className="text-shb-title-4">{savingSpace}</span>
            </div>
          </div>
        )}
      </BottomPanelSubSection>
    </BottomPanelSection>
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

  if (series[0]?.type === "pie") {
    series[0].borderColor = "#ECEAE6";
    series[0].innerSize = "50%";
  }

  const options = {
    ...HIGHCHARTS_OPTIONS_DEFAUlT,
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
