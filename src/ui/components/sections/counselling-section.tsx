import { RefObject } from "react";
import Section, { SectionHeader, SubSection } from "../layout/section";
import Checkbox from "../atoms/checkbox";
import useUserInterfaceState from "@/stores/ui-store";
import { useShallow } from "zustand/shallow";
import useEconomicPlanState, {
  Act,
  EconomicPlan,
} from "@/stores/economic-plan-store";
import { diffDebt } from "@/utils/act";

export default function CounsellingSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan, state.planUpdated])
  );

  const [counselling, setCounselling] = useUserInterfaceState(
    useShallow((state) => [state.counselling, state.setCounselling])
  );

  function onCheckedChangeHandler(checked: boolean) {
    setCounselling(checked);
  }

  return (
    <Section ref={ref} headerPadding={true} colorScheme="hb6">
      <SectionHeader title="Rådgivningsinformation" />
      <p className="font-ingresso-slab text-shb-title-5 max-w-screen-md">
        Handelsbanken erbjuder bolånerådgivning dolor adipisci maiores animi.
        Hic itaque explicabo tempore culpa corrupti, at cum ut et odit officiis
        nisi nesciunt.
      </p>
      <div className="pt-4 text-foreground">
        <div className="flex p-6 w-fit border rounded-lg bg-shb-hb2-light">
          <Checkbox
            label="Ja – Jag vill ha rådgivning"
            checked={counselling}
            onCheckedChange={onCheckedChangeHandler}
          />
        </div>
      </div>
      {counselling && (
        <SubSection title="Räntebindning" headerPadding={true}>
          <div className="pt-4 text-foreground">
            <div className="flex p-6 w-full border rounded-lg bg-shb-hb2-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              perferendis voluptate quo, consequuntur eveniet assumenda nesciunt
              pariatur dolorem saepe ratione culpa neque, quam maxime dolor
              impedit nisi unde tenetur fugiat!
            </div>
          </div>
        </SubSection>
      )}
      {counselling && (
        <SubSection title="Övriga områden" headerPadding={true}>
          {economicPlan.acts.map((act) => {
            if (act.new) {
              return (
                <ActDiffContainer
                  key={act.id}
                  economicPlan={economicPlan}
                  act={act}
                />
              );
            }
          })}
        </SubSection>
      )}
    </Section>
  );
}

function ActDiffContainer({
  economicPlan,
  act,
}: {
  economicPlan: EconomicPlan;
  act: Act;
}) {
  return (
    <div className="pt-4 text-foreground">
      <div className="flex p-6 w-full border rounded-lg bg-shb-hb2-light">
        {diffDebt(economicPlan, act) ? (
          <div>
            <Checkbox
              label="Sänkt belopp för <strong>lägre räntekostnad per månad</strong>."
              checked={false}
              onCheckedChange={() => {}}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
