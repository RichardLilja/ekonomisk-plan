import { ChangeEvent, useState } from "react";

export function TableSelect({
  value,
  options,
  onChangeHandler,
}: {
  value: number | string;
  options: Array<{
    value: number | string;
    label: string;
  }>;
  onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      className="-translate-x-1 bg-transparent hover:bg-shb-hb5-light text-interactive text-shb-text-1 cursor-pointer"
      value={value}
      onChange={onChangeHandler}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
