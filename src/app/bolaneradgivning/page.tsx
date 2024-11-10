"use client";

import useUserInterfaceState from "@/stores/ui-store";
import BottomPanel from "@/ui/components/layout/bottom-panel";
import Keyboard from "@/ui/components/layout/keyboard";
import Overlay from "@/ui/components/layout/overlay";
import Sidebar, {
  SidebarHeader,
  SidebarScrollContainer,
} from "@/ui/components/layout/sidebar";
import ActsSection from "@/ui/components/sections/acts-section";
import CustomerEconomyBottomPanelSection from "@/ui/components/sections/bottom-panel/bottom-panel-customer-economy";
import BufferSection from "@/ui/components/sections/buffer-section";
import FamilyLawSection from "@/ui/components/sections/family-law-section";
import NewLoanSection from "@/ui/components/sections/new-loan-section";
import OverviewSection from "@/ui/components/sections/overview-section";
import PageHeader from "@/ui/components/sections/page/page-header";
import PageSectionSeparator from "@/ui/components/sections/page/page-section-separator";
import CounsellingSidebarSection from "@/ui/components/sections/sidebar/sidebar-counselling";
import InterestRatesSidebarSection from "@/ui/components/sections/sidebar/sidebar-interest-rates";
import UserInterfaceSidebarSection from "@/ui/components/sections/sidebar/sidebar-user-interface";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";

export default function Page() {
  const [overlay] = useUserInterfaceState(
    useShallow((state) => [state.overlay])
  );

  const slides = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ];

  return (
    <Keyboard slides={slides}>
      <main className="bg-shb-hb6">
        <article inert={overlay ? true : false}>
          <PageHeader
            ref={slides[0]}
            title="Bolånerådgivning"
            imageSource="/bolaneradgivning.jpg"
          />
          <OverviewSection ref={slides[1]} />
          <ActsSection ref={slides[2]} />
          <PageSectionSeparator />
          <NewLoanSection ref={slides[3]} />
          <FamilyLawSection ref={slides[4]} />
          <BufferSection ref={slides[5]} />
        </article>
        <div inert={overlay ? false : true}>
          <Sidebar>
            <SidebarHeader title="Inställningar" />
            <SidebarScrollContainer>
              <UserInterfaceSidebarSection />
              <InterestRatesSidebarSection />
              <CounsellingSidebarSection />
            </SidebarScrollContainer>
          </Sidebar>
          <Overlay />
        </div>
        <div>
          <BottomPanel>
            <CustomerEconomyBottomPanelSection />
          </BottomPanel>
        </div>
      </main>
    </Keyboard>
  );
}
