import { RefObject } from "react";
import Section, { SectionHeader } from "../layout/section";

export default function BufferSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  return (
    <Section
      ref={ref}
      width="half"
      imagePosition="left"
      imageSource="/buffer.jpg"
    >
      <SectionHeader
        title="Buffert"
        preamble="En buffert bidrar till din ekonomiska trygghet. Se den som en livlina som du använder när livet bjuder på överraskningar."
      />
    </Section>
  );
}
