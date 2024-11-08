import * as SwitchPrimitives from "@radix-ui/react-switch";

export default function Switch({
  label,
  onCheckedChange,
  checked,
}: {
  label: string;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
}) {
  return (
    <label className="flex justify-between items-center">
      <span className="text-shb-text-2">{label}</span>
      <SwitchPrimitives.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="peer inline-flex h-6 w-[2.625rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-shb-hb1 data-[state=checked]:hover:bg-shb-hb6 data-[state=unchecked]:bg-shb-gray-62 data-[state=unchecked]:hover:bg-shb-hb6"
      >
        <SwitchPrimitives.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.125rem] data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitives.Root>
    </label>
  );
}
