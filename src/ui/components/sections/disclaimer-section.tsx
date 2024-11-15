import { RefObject } from "react";
import Section, { SectionHeader } from "../layout/section";
import Checkbox from "../atoms/checkbox";
import useUserInterfaceState from "@/stores/ui-store";
import { useShallow } from "zustand/shallow";

export default function DisclaimerSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  const [counselling, setCounselling] = useUserInterfaceState(
    useShallow((state) => [state.counselling, state.setCounselling])
  );

  function onCheckedChangeHandler(checked: boolean) {
    setCounselling(checked);
  }

  return (
    <Section ref={ref} headerPadding={true}>
      <SectionHeader title="Rådgivningsinformation" />
      <p className="font-ingresso-slab text-shb-title-5 max-w-screen-md">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quo
        quidem explicabo dolorum accusantium beatae dicta, delectus neque illum
        cumque sed facere.
      </p>
      <div className="pt-4">
        <div className="flex p-6 w-full border rounded-lg bg-shb-white">
          <Checkbox
            label="Ja – Jag vill ha rådgivning"
            checked={counselling}
            onCheckedChange={onCheckedChangeHandler}
          />
        </div>
      </div>
    </Section>
  );
}
