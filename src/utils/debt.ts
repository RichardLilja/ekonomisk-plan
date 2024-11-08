import { Act, Customer } from "@/stores/economic-plan-store";

export function sumDebtForAct(act: Act, rounded: boolean = true) {
  let totalDebt = 0;

  act.loans.forEach((loan) => {
    totalDebt += loan.debt;
  });

  if (rounded) {
    return Math.ceil(totalDebt);
  }
  return totalDebt;
}

export function calculateDebtRatio(
  customer: Customer,
  acts: Array<Act>,
  rounded: boolean = true
) {
  let totalDebt = 0;

  acts.forEach((act) => {
    totalDebt += sumDebtForAct(act);
  });

  const annualGrossIncome = customer.incomes.salary * 12;
  const ratio = totalDebt / annualGrossIncome;

  if (rounded) {
    return ratio.toFixed(1);
  }
  return ratio;
}
