import { create } from "zustand";

export interface EconomicPlanState {
  plans: Array<EconomicPlan>;
  currentPlan: EconomicPlan;
  planUpdated: boolean;
}

export interface EconomicPlan {
  customers: Array<Customer>;
  customersUpdated: boolean;
  insertCustomer: (customer: Customer) => void;

  acts: Array<Act>;
  snapshots: Array<Act>;
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
  usedInCalculations: boolean;
  interestRates: Array<number>;
}

export interface Loan {
  id: string;
  debt: number;
  periodIndex: number;
  startDate: Date | undefined;
  amortization: number;
}

const customerOve: Customer = {
  name: "Ove Jordgubbe",
  id: "670329-2133",
  city: "Växsjö",
  expenditures: {
    operatingCost: 10000,
    costOfLiving: 10000,
  },
  assets: {
    otherBanks: 750000,
    handelsbanken: 350000,
  },
  incomes: {
    salary: 76000,
  },
};

const oldAct = {
  id: "ove-old-1",
  object: "Gamla Villavägen 123:456",
  belongsToCustomer: ["670329-2133"],
  new: false,
  valuation: 3000000,
  mortgageDeed: 2100000,
  contractType: "Hypotekslån",
  energyClass: "B",
  usedInCalculations: true,
  interestRates: [4.05, 3.22, 2.86, 3.19, 3.18, 3.42, 3.39],
  loans: [
    {
      id: "15-12345-11111",
      debt: 1000000,
      periodIndex: 0,
      startDate: new Date("2024-11-03"),
      amortization: 2000,
    },
    {
      id: "15-12345-22222",
      debt: 800000,
      periodIndex: 2,
      startDate: new Date("2024-06-12"),
      amortization: 0,
    },
  ],
};

const newAct: Act = {
  id: "ove-new-1",
  object: "Nya Fritidsstigen 333:12",
  belongsToCustomer: ["670329-2133"],
  new: true,
  valuation: 1000000,
  mortgageDeed: 100000,
  contractType: "Hypotekslån",
  energyClass: "A",
  usedInCalculations: true,
  interestRates: [4.05, 3.22, 2.86, 3.19, 3.18, 3.42, 3.39],
  loans: [
    {
      id: "nytt-15-12345-11111",
      debt: 500000,
      periodIndex: 0,
      startDate: undefined,
      amortization: 2000,
    },
  ],
};

const snapNewAct: Act = {
  id: "ove-new-1",
  object: "Nya Fritidsstigen 333:12",
  belongsToCustomer: ["670329-2133"],
  new: true,
  valuation: 1000000,
  mortgageDeed: 100000,
  contractType: "Hypotekslån",
  energyClass: "A",
  usedInCalculations: true,
  interestRates: [4.05, 3.22, 2.86, 3.19, 3.18, 3.42, 3.39],
  loans: [
    {
      id: "nytt-15-12345-11111",
      debt: 500000,
      periodIndex: 0,
      startDate: undefined,
      amortization: 2000,
    },
  ],
};

const useEconomicPlanState = create<EconomicPlanState>((set) => ({
  plans: [],
  planUpdated: false,
  currentPlan: {
    customers: [{ ...customerOve }],
    customersUpdated: false,
    insertCustomer: (customer) =>
      set((state) => {
        const customers = [...state.currentPlan.customers];
        const index = customers.findIndex((c) => c.id === customer.id);

        if (index > -1) {
          customers.splice(index, 1);
          customers.push(customer);
        }

        return {
          planUpdated: !state.planUpdated,
          currentPlan: {
            ...state.currentPlan,
            customers,
            customersUpdated: !state.currentPlan.customersUpdated,
          },
        };
      }),
    acts: [{ ...oldAct }, { ...newAct }],
    snapshots: [{ ...snapNewAct }],
    actsUpdated: false,
    insertAct: (act) =>
      set((state) => {
        const acts = [...state.currentPlan.acts];
        const index = acts.findIndex((a) => a.id === act.id);

        if (index > -1) {
          acts.splice(index, 1);
          acts.push(act);
        }

        return {
          planUpdated: !state.planUpdated,
          currentPlan: {
            ...state.currentPlan,
            acts,
            customersUpdated: !state.currentPlan.actsUpdated,
          },
        };
      }),
  },
}));

export default useEconomicPlanState;
