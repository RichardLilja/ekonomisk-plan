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
