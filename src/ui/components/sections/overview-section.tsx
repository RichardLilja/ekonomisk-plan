import { RefObject } from "react";
import Section, { SectionHeader, SubSection } from "../layout/section";

import OverviewCustomersList from "./overview-section-customers";
import OverviewExpenseSection from "./overview-section-expenses";
import OverviewBalanceSection from "./overview-section-balance";

export default function OverviewSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  return (
    <Section ref={ref} headerPadding={true}>
      <SectionHeader title="Översikt" />
      <SubSection title="Personer i hushållet" headerPadding={true}>
        <div className="pt-3 pb-6">
          <OverviewCustomersList />
        </div>
      </SubSection>
      <SubSection title="Ekonomi">
        <div className="grid grid-cols-1 gap-3 pt-3 lg:grid-cols-2">
          <OverviewExpenseSection />
          <OverviewBalanceSection />
        </div>
      </SubSection>
    </Section>
  );
}
