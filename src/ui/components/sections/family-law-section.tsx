import { RefObject } from "react";
import Section, { SectionHeader } from "../layout/section";

export default function FamilyLawSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  return (
    <Section
      ref={ref}
      width="half"
      imagePosition="right"
      imageSource="/family-law.jpg"
    >
      <SectionHeader
        title="Familjejuridik"
        preamble="Genom att ha koll på avtal skapar du en trygghet både för dig och dina nära och kära."
      />
    </Section>
  );
}
