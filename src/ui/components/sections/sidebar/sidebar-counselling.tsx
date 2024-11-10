import useUserInterfaceState from "@/stores/ui-store";
import Switch from "../../atoms/switch";
import { SidebarSection } from "../../layout/sidebar";
import { useShallow } from "zustand/shallow";

export default function CounsellingSidebarSection() {
  const [counselling, setCounselling] = useUserInterfaceState(
    useShallow((state) => [state.counselling, state.setCounselling])
  );

  return (
    <SidebarSection title="Rådgivning">
      <Switch
        label="Rådgivning"
        checked={counselling}
        onCheckedChange={(checked) => {
          setCounselling(checked);
        }}
      />
    </SidebarSection>
  );
}
