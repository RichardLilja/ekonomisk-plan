import { ChangeEvent, KeyboardEventHandler } from "react";

export function InputText({
  value,
  onChangeHandler,
  label = "",
  displayLabel = false,
}: {
  value: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  displayLabel?: boolean;
}) {
  if (displayLabel) {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-shb-title-11">{label}</span>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          className="border rounded-lg h-12 px-4 text-shb-text-2 shadow-input shadow-shb-gray-62 hover:shadow-shb-hb6 focus:shadow-input-focus focus:shadow-shb-hb1 focus:outline-none"
        />
      </label>
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={onChangeHandler}
      className="w-full border rounded-lg h-12 px-4 text-shb-text-2 shadow-input shadow-shb-gray-62 hover:shadow-shb-hb6 focus:shadow-input-focus focus:shadow-shb-hb1 focus:outline-none"
    />
  );
}

export function InputTextBlur({
  defaultValue,
  onBlurHandler,
  label = "",
  displayLabel = false,
}: {
  defaultValue: string;
  onBlurHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  displayLabel?: boolean;
}) {
  if (displayLabel) {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-shb-title-11">{label}</span>
        <input
          type="text"
          defaultValue={defaultValue}
          onBlur={onBlurHandler}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
          className="border rounded-lg h-12 px-4 text-shb-text-2 shadow-input shadow-shb-gray-62 hover:shadow-shb-hb6 focus:shadow-input-focus focus:shadow-shb-hb1 focus:outline-none"
        />
      </label>
    );
  }
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      onBlur={onBlurHandler}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      className="w-full border rounded-lg h-12 px-4 text-shb-text-2 shadow-input shadow-shb-gray-62 hover:shadow-shb-hb6 focus:shadow-input-focus focus:shadow-shb-hb1 focus:outline-none"
    />
  );
}
export function TableInput({
  defaultValue,
  onBlurHandler,
}: {
  defaultValue: string;
  onBlurHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      pattern="[0-9 ]+"
      onBlur={onBlurHandler}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      className="w-full bg-transparent hover:bg-shb-hb5-light text-interactive text-shb-text-1"
    />
  );
}
