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
