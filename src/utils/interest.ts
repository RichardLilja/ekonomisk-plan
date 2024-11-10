import { Act, Loan } from "@/stores/economic-plan-store";

export function sumInterestForLoan(
  act: Act,
  loan: Loan,
  rounded: boolean = true
) {
  const interest = act.interestRates[loan.periodIndex] / 100;
  const sumInterest = (loan.debt * interest) / 12;

  if (rounded) {
    return Math.ceil(sumInterest);
  }
  return sumInterest;
}

export function sumInterestForAct(act: Act, rounded: boolean = true) {
  let totalInterest = 0;

  act.loans.forEach((loan) => {
    totalInterest += sumInterestForLoan(act, loan);
  });

  if (rounded) {
    return Math.ceil(totalInterest);
  }
  return totalInterest;
}
