const TAXES = {
  MUNICIPAL_TAX: 0.32,
  STATE_TAX: 0.2,
  STATE_TAX_THRESHOLD: 51200,
  EMPLOYMENT_TAX_CREDIT: 3578,
};

export function calculateTax(grossIncome: number, rounded: boolean = true) {
  let totalTaxes = 0;

  totalTaxes += grossIncome * TAXES.MUNICIPAL_TAX;

  if (grossIncome > TAXES.STATE_TAX_THRESHOLD) {
    const stateTaxableIncome = grossIncome - TAXES.STATE_TAX_THRESHOLD;
    totalTaxes += stateTaxableIncome * TAXES.STATE_TAX;
  }

  if (rounded) {
    return Math.ceil(totalTaxes);
  }

  return totalTaxes;
}

export function calculateNetIncome(
  grossIncome: number,
  rounded: boolean = true
) {
  const netIncome = grossIncome - calculateTax(grossIncome);

  if (rounded) {
    return Math.ceil(netIncome);
  }

  return netIncome;
}
