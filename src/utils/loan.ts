import { Act } from "@/stores/economic-plan-store";
import { sumDebtForAct } from "./debt";

export function calculateLoanToValueRatio(act: Act, rounded: boolean = true) {
  const value = act.valuation;
  let totalDebt = sumDebtForAct(act);

  const loanToValueRatio = totalDebt / value;

  if (rounded) {
    return Math.round(loanToValueRatio * 100) / 100;
  }
  return loanToValueRatio;
}

export function calculateLegalCost(act: Act, rounded: boolean = true) {
  const valuation = act.valuation;
  const totalDebt = sumDebtForAct(act);

  let costBase = 0;
  if (valuation > totalDebt) {
    costBase = valuation;
  } else {
    costBase = totalDebt;
  }

  const legalCost = costBase * 0.015;

  if (rounded) {
    return Math.round(legalCost);
  }
  return legalCost;
}

export function fetchPeriodLabel(periodIndex: number) {
  const LABELS = ["3 mån", "1 år", "2 år", "3 år", "5 år", "8 år", "10 år"];

  if (!LABELS[periodIndex]) {
    return "";
  }
  return LABELS[periodIndex];
}

export function calculateEndDate(
  startDate: Date | undefined,
  periodIndex: number
) {
  if (startDate === undefined) {
    startDate = new Date(new Date().toISOString().split(/[T ]/i, 1)[0]);
  }

  const ADD = [3, 12, 24, 36, 60, 96, 120];

  let newMonth = startDate.getMonth();
  if (ADD[periodIndex]) {
    newMonth += ADD[periodIndex];
  }

  return new Date(new Date(startDate).setMonth(newMonth))
    .toISOString()
    .split(/[T ]/i, 1)[0];
}
