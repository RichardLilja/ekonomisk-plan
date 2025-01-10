"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export default function Checkbox({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex gap-2 items-center  hover:underline">
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex justify-center items-center h-5 w-5 border border-shb-gray-62 rounded-sm bg-shb-white hover:border-shb-hb6 data-[state=checked]:bg-shb-hb1 data-[state=checked]:border-shb-hb1 data-[state=checked]:hover:bg-shb-hb6 data-[state=checked]:hover:border-shb-hb6"
      >
        <CheckboxPrimitive.Indicator className="CheckboxIndicator">
          <Check className="h-3 text-shb-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span
        dangerouslySetInnerHTML={{ __html: label }}
        className="text-shb-text-2"
      ></span>
    </label>
  );
}
