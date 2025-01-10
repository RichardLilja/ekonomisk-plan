import { ChangeEvent, useState } from "react";

const sharedStyle =
  "p-3 border rounded-lg text-shb-text-2 shadow-input shadow-shb-gray-62 hover:shadow-shb-hb6 focus:shadow-input-focus focus:shadow-shb-hb1 focus:outline-none col-start-1 col-end-2 row-start-1 row-end-2";

export function TextArea({}: {}) {
  const [textValue, setTextValue] = useState("");

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(event.target.value);
  }

  return (
    <div className="grid">
      <textarea
        rows={3}
        className={`${sharedStyle} resize-none overflow-hidden `}
        value={textValue}
        onChange={handleOnChange}
      ></textarea>
      <div
        className={`${sharedStyle} whitespace-pre-wrap invisible`}
        aria-hidden="true"
      >
        {textValue + " "}
      </div>
    </div>
  );
}
