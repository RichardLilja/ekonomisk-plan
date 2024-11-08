import { create } from "zustand";

export interface EconomicPlanState {
  plans: Array<EconomicPlan>;
  currentPlan: EconomicPlan;
}

export interface EconomicPlan {
  customers: Array<Customer>;
  customersUpdated: boolean;
  insertCustomer: (customer: Customer) => void;

  acts: Array<Act>;
  actsUpdated: boolean;
  insertAct: (act: Act) => void;
}

export interface Incomes {
  salary: number;
}

export interface Expenditures {
  operatingCost: number;
  costOfLiving: number;
}

export interface Assets {
  otherBanks: number;
  handelsbanken: number;
}

export interface Customer {
  name: string;
  id: string;
  city: string;
  expenditures: Expenditures;
  assets: Assets;
  incomes: Incomes;
}

export interface Act {
  id: string;
  object: string;
  belongsToCustomer: Array<string>;
  new: boolean;
  valuation: number;
  mortgageDeed: number;
  contractType: string;
  energyClass: string;
  loans: Array<Loan>;
}

export interface Loan {
  id: string;
  debt: number;
  interest: number;
  period: string;
  expireDate: string;
  amortization: number;
}

const useEconomicPlanState = create<EconomicPlanState>((set) => ({
  plans: [],
  currentPlan: {
    customers: [
      {
        name: "Ove Jordgubbe",
        id: "670329-2133",
        city: "Växsjö",
        expenditures: {
          operatingCost: 10000,
          costOfLiving: 10000,
        },
        assets: {
          otherBanks: 230000,
          handelsbanken: 230000,
        },
        incomes: {
          salary: 76000,
        },
      },
    ],
    customersUpdated: false,
    insertCustomer: (customer) =>
      set((state) => {
        const customers = [...state.currentPlan.customers];
        const index = customers.findIndex((c) => c.id === customer.id);

        if (index) {
          customers.splice(index, 1);
          customers.push(customer);
        }

        return {
          currentPlan: {
            ...state.currentPlan,
            customers,
            customersUpdated: !state.currentPlan.customersUpdated,
          },
        };
      }),
    acts: [
      {
        id: "ove-old-1",
        object: "Gamla Villavägen 123:456",
        belongsToCustomer: ["670329-2133"],
        new: false,
        valuation: 3000000,
        mortgageDeed: 0,
        contractType: "Hypotekslån",
        energyClass: "A",
        loans: [
          {
            id: "15-12345-11111",
            debt: 2000000,
            interest: 0.0375,
            period: "3 mån",
            expireDate: "2024-11-03",
            amortization: 2000,
          },
          {
            id: "15-12345-22222",
            debt: 2000000,
            interest: 0.0375,
            period: "3 mån",
            expireDate: "2024-11-03",
            amortization: 2000,
          },
        ],
      },
      {
        id: "ove-new-1",
        object: "Nya Bostadsvägen 333:12",
        belongsToCustomer: ["670329-2133"],
        new: true,
        valuation: 4500000,
        mortgageDeed: 0,
        contractType: "Hypotekslån",
        energyClass: "A",
        loans: [
          {
            id: "nytt-15-12345-11111",
            debt: 2000000,
            interest: 0.0375,
            period: "3 mån",
            expireDate: "2024-11-03",
            amortization: 2000,
          },
        ],
      },
    ],
    actsUpdated: false,
    insertAct: (act) =>
      set((state) => {
        const acts = [...state.currentPlan.acts];
        const index = acts.findIndex((a) => a.id === act.id);

        if (index) {
          acts.splice(index, 1);
          acts.push(act);
        }

        return {
          currentPlan: {
            ...state.currentPlan,
            acts,
            customersUpdated: !state.currentPlan.customersUpdated,
          },
        };
      }),
  },
}));

export default useEconomicPlanState;
