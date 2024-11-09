import { Act, Customer } from "@/stores/economic-plan-store";
import { sumAmortizationForAct } from "@/utils/amortization";
import { sumInterestForAct } from "@/utils/interest";
import { calculateNetIncome } from "@/utils/tax";
import { Options, SeriesOptionsType } from "highcharts";

export function expensesGraphItems(
  customers: Array<Customer>,
  acts: Array<Act>
) {
  const items = {
    totalAmortization: 0,
    totalInterest: 0,
    operatingCost: 0,
    costOfLiving: 0,
    savingSpace: 0,
  };

  let totalIncome = 0;

  customers.forEach((customer) => {
    totalIncome += calculateNetIncome(customer.incomes.salary);
    items.costOfLiving += customer.expenditures.costOfLiving;
    items.operatingCost += customer.expenditures.operatingCost;
  });

  acts.forEach((act) => {
    if (act.usedInCalculations) {
      items.totalAmortization += sumAmortizationForAct(act);
      items.totalInterest += sumInterestForAct(act);
    }
  });

  items.savingSpace =
    totalIncome -
    items.totalAmortization -
    items.totalInterest -
    items.costOfLiving -
    items.operatingCost;

  return items;
}

export function formatExpensesGraphData({
  totalAmortization,
  totalInterest,
  operatingCost,
  costOfLiving,
  savingSpace,
}: {
  totalAmortization: number;
  totalInterest: number;
  operatingCost: number;
  costOfLiving: number;
  savingSpace: number;
}) {
  return [
    { name: "Ränta", y: totalInterest, color: "#043B62" },
    { name: "Amortering", y: totalAmortization, color: "#42B5D7" },
    { name: "Hushållsutgifter", y: costOfLiving, color: "#DF638E" },
    {
      name: "Driftkostnader",
      y: operatingCost,
      color: "#EAF4F7",
    },
    { name: "Sparutrymme", y: savingSpace, color: "#005FA5" },
  ];
}

interface SeriesData {
  name: string;
  y: number;
  color: string;
}

export function getExpensesGraphSeries(data: Array<SeriesData>) {
  return {
    type: "pie",
    innerSize: "50%",
    name: "SEK",
    data,
  } as SeriesOptionsType;
}

export const HIGHCHARTS_OPTIONS_DEFAUlT: Options = {
  title: undefined,
  accessibility: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  chart: {
    type: "pie",
    margin: [0, 0, 0, 0],
    height: null,
    width: null,
    backgroundColor: "transparent",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      borderWidth: 1,
      dataLabels: {
        enabled: false,
      },
    },
  },
};
