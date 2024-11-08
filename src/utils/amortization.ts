import { calculateLoanToValueRatio } from "./loan";
import { sumDebtForAct } from "./debt";
import { Act } from "@/stores/economic-plan-store";

export function sumAmortizationForAct(act: Act, rounded: boolean = true) {
  let totalAmortization = 0;

  act.loans.forEach((loan) => {
    totalAmortization += loan.amortization;
  });

  if (rounded) {
    return Math.ceil(totalAmortization);
  }
  return totalAmortization;
}

export function calculateMinAmortization(act: Act, rounded: boolean = true) {
  const loanToValueRatio = calculateLoanToValueRatio(act);

  if (loanToValueRatio > 0.7) {
    return 0.02;
  } else if (loanToValueRatio > 0.5) {
    return 0.01;
  } else {
    return 0;
  }
}

export function calculateMinAmortizationSum(act: Act, rounded: boolean = true) {
  const minAmortization = calculateMinAmortization(act);
  let totalDebt = sumDebtForAct(act);

  const sum = (totalDebt * minAmortization) / 12;

  if (rounded) {
    return Math.ceil(sum);
  }
  return sum;
}
