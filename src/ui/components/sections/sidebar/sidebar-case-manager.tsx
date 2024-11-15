import useUserInterfaceState from "@/stores/ui-store";
import Switch from "../../atoms/switch";
import { SidebarSection } from "../../layout/sidebar";
import { useShallow } from "zustand/shallow";

export default function CaseManagerSidebarSection() {
  const [loanGranted, setLoanGranted] = useUserInterfaceState(
    useShallow((state) => [state.loanGranted, state.setLoanGranted])
  );

  return (
    <SidebarSection title="Ärendehanter Bolån">
      <Switch
        label="Lån beviljat"
        checked={loanGranted}
        onCheckedChange={(checked) => {
          setLoanGranted(checked);
        }}
      />
    </SidebarSection>
  );
}
