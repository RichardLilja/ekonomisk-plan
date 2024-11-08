import useEconomicPlanState, { Customer } from "@/stores/economic-plan-store";
import { calculateDebtRatio } from "@/utils/debt";
import { numberWithSpaces } from "@/utils/formatting";
import { calculateNetIncome } from "@/utils/tax";
import { useShallow } from "zustand/shallow";

export default function OverviewCustomersList() {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {economicPlan.customers.map((customer) => (
        <CustomerItem key={customer.id} customer={customer} />
      ))}
    </ul>
  );
}

function CustomerItem({ customer }: { customer: Customer }) {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <li className="grid grid-rows-subgrid row-span-3 h-full border rounded-lg overflow-hidden bg-white">
      <div className="px-6 py-4 bg-shb-hb2-light">
        <h4 className="font-header-slab text-shb-title-7">{customer.name}</h4>
        <p className="text-shb-text-1">{customer.id}</p>
      </div>
      <dl className="px-6 pt-2 pb-5 text-shb-text-2">
        <dt className="font-bold">Nettoinkomst</dt>
        <dd>
          {numberWithSpaces(calculateNetIncome(customer.incomes.salary))} SEK
        </dd>
        <dt className="pt-4 font-bold">Aktuell skuldkvot</dt>
        <dd>{calculateDebtRatio(customer, economicPlan.acts)}</dd>
      </dl>
    </li>
  );
}
