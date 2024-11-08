import { Act, Loan } from "@/stores/economic-plan-store";

export function sumInterestForLoan(loan: Loan, rounded: boolean = true) {
  const interest = (loan.debt * loan.interest) / 12;

  if (rounded) {
    return Math.ceil(interest);
  }
  return interest;
}

export function sumInterestForAct(act: Act, rounded: boolean = true) {
  let totalInterest = 0;

  act.loans.forEach((loan) => {
    totalInterest += sumInterestForLoan(loan);
  });

  if (rounded) {
    return Math.ceil(totalInterest);
  }
  return totalInterest;
}
