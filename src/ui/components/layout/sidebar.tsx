"use client";

import useUserInterfaceState from "@/stores/ui-store";
import { X } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebar] = useUserInterfaceState(
    useShallow((state) => [state.sidebar])
  );

  return (
    <section
      className={`h-dvh max-h-dvh flex flex-col w-full md:max-w-80 fixed top-0 right-0 z-50 transition transform duration-300 bg-shb-white shadow-[rgba(0,0,0,0.32)_0px_0px_8px_0px] ${
        sidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {children}
    </section>
  );
}

export function SidebarHeader({ title }: { title: string }) {
  const [setSidebar, setOverlay] = useUserInterfaceState(
    useShallow((state) => [state.setSidebar, state.setOverlay])
  );

  function closeSidebar() {
    setSidebar(false);
    setOverlay(false);
  }

  return (
    <div className="flex justify-between items-center pl-6 pr-3 h-16 border-b">
      <header>
        <h2 className="font-header-slab text-shb-title-5">{title}</h2>
      </header>
      <nav>
        <button
          className="flex flex-col justify-center items-center h-16 w-16 text-shb-text-3 leading-none text-interactive hover:bg-shb-gray-10 hover:text-shb-hb6"
          onClick={closeSidebar}
        >
          <X />
          stäng
        </button>
      </nav>
    </div>
  );
}

export function SidebarScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100dvh-4rem)] overflow-y-scroll">{children}</div>
  );
}

export function SidebarSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-6 border-b">
      {title ? (
        <header>
          <h3 className="font-header-slab text-shb-title-7">{title}</h3>
        </header>
      ) : null}
      <div className="flex flex-col gap-1.5 pt-3">{children}</div>
    </section>
  );
}
