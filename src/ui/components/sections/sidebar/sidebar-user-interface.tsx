import useUserInterfaceState from "@/stores/ui-store";
import Switch from "../../atoms/switch";
import { SidebarSection } from "../../layout/sidebar";
import { useShallow } from "zustand/shallow";

export default function UserInterfaceSidebarSection() {
  const [
    slideMode,
    setSlideMode,
    bottomPanelSmallWidgets,
    setBottomPanelSmallWidgets,
  ] = useUserInterfaceState(
    useShallow((state) => [
      state.slideMode,
      state.setSlideMode,
      state.bottomPanelSmallWidgets,
      state.setBottomPanelSmallWidgets,
    ])
  );

  return (
    <SidebarSection title="Gränssnitt">
      <Switch
        label="Slide-läge"
        checked={slideMode}
        onCheckedChange={(checked) => {
          setSlideMode(checked);
        }}
      />
      <Switch
        label="Små widgets i bottenpanel"
        checked={bottomPanelSmallWidgets}
        onCheckedChange={(checked) => {
          setBottomPanelSmallWidgets(checked);
        }}
      />
    </SidebarSection>
  );
}
