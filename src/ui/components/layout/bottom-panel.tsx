import useUserInterfaceState from "@/stores/ui-store";
import { useShallow } from "zustand/shallow";

export default function BottomPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bottomPanel] = useUserInterfaceState(
    useShallow((state) => [state.bottomPanel])
  );

  return (
    <div
      className={`flex justify-center fixed bottom-0 left-0 right-0 z-20 bg-shb-hb6 text-shb-white transition transform duration-300 ${
        bottomPanel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}

export function BottomPanelSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 px-6 w-full max-w-screen-xl md:px-12">
      {children}
    </section>
  );
}

export function BottomPanelSubSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex flex-col">{children}</section>;
}
