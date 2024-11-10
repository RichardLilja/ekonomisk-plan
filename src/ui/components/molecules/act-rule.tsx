import { ActRuleResponseObject } from "@/utils/act";
import { CircleAlert, ThumbsUp, TriangleAlert } from "lucide-react";

export function ActRuleList({ children }: { children: React.ReactNode }) {
  return <ul className={"flex flex-col gap-0.5 px-5 pb-4"}>{children}</ul>;
}

export function ActRule({ response }: { response: ActRuleResponseObject }) {
  if (response.pass === false && !response.text) {
    return null;
  }
  return (
    <li className="flex items-start gap-2">
      {response.pass && (
        <span className="shrink-0 pt-[1.5px]">
          <ThumbsUp height={20} className="text-shb-hb7-contrast" />
        </span>
      )}
      {!response.pass && (
        <span className="shrink-0 pt-[3.5px]">
          <TriangleAlert height={20} className="text-danger shrink-0" />
        </span>
      )}
      <span className="text-shb-text-1 text-shb-gray-70">{response.text}</span>
    </li>
  );
}

export function ManualActRule({
  icon,
  children,
}: {
  icon: "thumbs-up" | "thumbs-down" | "information";
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      {icon === "thumbs-up" && (
        <span className="shrink-0 pt-[1.5px]">
          <ThumbsUp height={20} className="text-shb-hb7-contrast shrink-0" />
        </span>
      )}
      {icon === "thumbs-down" && (
        <span className="shrink-0 pt-[3.5px]">
          <TriangleAlert height={20} className="text-danger shrink-0" />
        </span>
      )}
      {icon === "information" && (
        <span className="shrink-0 pt-[2.5px]">
          <CircleAlert height={20} className="text-shb-hb1" />
        </span>
      )}
      <span className="text-shb-text-1 text-shb-gray-70">{children}</span>
    </li>
  );
}
