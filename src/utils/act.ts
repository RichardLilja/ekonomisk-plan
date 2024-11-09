import { Act } from "@/stores/economic-plan-store";
import { sumDebtForAct } from "./debt";
import { numberWithSpaces } from "./formatting";
import { calculateLoanToValueRatio } from "./loan";

export type ActRuleResponseObject = {
  id: string;
  pass: boolean;
  text?: string;
};

export function ruleMortgageDeedAvailable(act: Act): ActRuleResponseObject {
  const id = "ruleMortgageDeedAvailable";

  const debt = sumDebtForAct(act);
  const available = act.mortgageDeed - debt;

  if (available > 0) {
    return {
      id,
      pass: true,
      text: `Det finns ${numberWithSpaces(
        Math.round(available)
      )} SEK att låna upp på befintliga pantbrev.`,
    };
  }
  return {
    id,
    pass: false,
  };
}

export function ruleEnergyClass(act: Act): ActRuleResponseObject {
  const id = "ruleEnergyClass";

  if (act.energyClass === "A") {
    return {
      id,
      pass: true,
      text: `Objektet omfattas av gröna villkor.`,
    };
  } else {
    return {
      id,
      pass: false,
    };
  }
}

export function ruleHighAmortization(act: Act): ActRuleResponseObject {
  const id = "ruleHighAmortization";

  if (calculateLoanToValueRatio(act) < 0.7) {
    return {
      id,
      pass: true,
    };
  }
  return {
    id,
    pass: false,
    text: "Belåningsgraden överstiger 70%. Kan du sänka den på något vis?",
  };
}
