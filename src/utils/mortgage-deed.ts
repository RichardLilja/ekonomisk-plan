import { Act } from "@/stores/economic-plan-store";
import { sumDebtForAct } from "./debt";

export function calculateNewMortgageDeeds(act: Act, rounded: boolean = true) {
  const currentDeeds = act.mortgageDeed;
  const totalDebt = sumDebtForAct(act);

  const newDeeds = totalDebt - currentDeeds;
  if (newDeeds <= 0) {
    return 0;
  }
  if (rounded) {
    return Math.round(newDeeds);
  }
  return newDeeds;
}

export function calculateExciseDuty(act: Act, rounded: boolean = true) {
  const newDeeds = calculateNewMortgageDeeds(act);
  const exciseDuty = newDeeds * 0.02;

  if (rounded) {
    return Math.round(exciseDuty);
  }
  return exciseDuty;
}
