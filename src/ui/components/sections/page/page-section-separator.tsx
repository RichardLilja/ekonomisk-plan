type SeparatorColorScheme = "default";

const colorSchemes = {
  default: "bg-background",
};

export default function PageSectionSeparator({
  colorScheme = "default",
}: {
  colorScheme?: SeparatorColorScheme;
}) {
  return <div className={`h-[1px] ${colorSchemes[colorScheme]}`}></div>;
}
