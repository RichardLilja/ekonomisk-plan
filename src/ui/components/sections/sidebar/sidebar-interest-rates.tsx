import useEconomicPlanState, { Act } from "@/stores/economic-plan-store";
import { InputTextBlur } from "../../atoms/input";
import { SidebarSection } from "../../layout/sidebar";
import { useShallow } from "zustand/shallow";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchPeriodLabel } from "@/utils/loan";

export default function InterestRatesSidebarSection() {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <SidebarSection title="Räntor för lån">
      <div className="flex flex-col gap-1.5">
        {economicPlan.acts.map((act) => (
          <Loan key={act.id} act={act} />
        ))}
      </div>
    </SidebarSection>
  );
}

export function Loan({ act }: { act: Act }) {
  const [display, setDisplay] = useState<boolean>(false);
  return (
    <section className="flex flex-col gap-1.5">
      <header>
        <button
          onClick={() => {
            setDisplay(!display);
          }}
          className="flex justify-between items-center font-header-slab text-shb-title-11 text-shb-hb1 text-left w-full"
        >
          {act.object}
          {display ? (
            <ChevronUp className="text-shb-hb1" />
          ) : (
            <ChevronDown className="text-shb-hb1" />
          )}
        </button>
      </header>
      {display && (
        <div className="flex flex-col gap-1.5 py-3">
          {act.interestRates.map((rate, index) => (
            <RateInput
              key={`${act.id}-rate-${index}`}
              act={act}
              rate={rate}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function RateInput({
  act,
  rate,
  index,
}: {
  act: Act;
  rate: number;
  index: number;
}) {
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );

  const label = fetchPeriodLabel(index);

  return (
    <label className="flex justify-between items-center w-full">
      <span>{label}</span>
      <div className="w-20">
        <InputTextBlur
          defaultValue={rate.toString()}
          onBlurHandler={(event) => {
            const newAct = { ...act };
            newAct.interestRates[index] = Number(event.target.value);
            insertAct(newAct);
          }}
        />
      </div>
    </label>
  );
}
