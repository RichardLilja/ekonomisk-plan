"use client";

import useUserInterfaceState from "@/stores/ui-store";
import Image from "next/image";
import { RefObject } from "react";
import { useShallow } from "zustand/shallow";

type SectionColorScheme = "default" | "hb5-light" | "hb6";
type SectionWidth = "full" | "half";
type SectionImagePosition = "left" | "right";

const colorSchemes = {
  default: "bg-background text-foreground",
  "hb5-light": "bg-shb-hb5-light text-foreground",
  hb6: "bg-shb-hb6 text-shb-white",
};

export default function Section({
  children,
  colorScheme = "default",
  width = "full",
  imagePosition = "right",
  imageSource = "",
  centerContent = true,
  headerPadding = true,
  ref,
}: {
  children: React.ReactNode;
  colorScheme?: SectionColorScheme;
  width?: SectionWidth;
  imagePosition?: SectionImagePosition;
  imageSource?: string;
  centerContent?: boolean;
  headerPadding?: boolean;
  ref: RefObject<HTMLElement>;
}) {
  if (width === "half") {
    return (
      <HalfWidth
        colorScheme={colorScheme}
        imagePosition={imagePosition}
        imageSource={imageSource}
        centerContent={centerContent}
        headerPadding={headerPadding}
        ref={ref}
      >
        {children}
      </HalfWidth>
    );
  }
  return (
    <FullWidth
      colorScheme={colorScheme}
      centerContent={centerContent}
      headerPadding={headerPadding}
      ref={ref}
    >
      {children}
    </FullWidth>
  );
}

function FullWidth({
  children,
  colorScheme,
  centerContent,
  headerPadding,
  ref,
}: {
  children: React.ReactNode;
  colorScheme: SectionColorScheme;
  centerContent: boolean;
  headerPadding: boolean;
  ref: RefObject<HTMLElement>;
}) {
  const [slideMode] = useUserInterfaceState(
    useShallow((state) => [state.slideMode])
  );

  return (
    <section
      ref={ref}
      className={`flex flex-col items-center py-6 md:py-12 ${
        slideMode && "min-h-dvh"
      } ${colorSchemes[colorScheme]} ${
        slideMode && centerContent && "justify-center"
      } ${headerPadding && "pt-3 md:pt-9"}`}
    >
      <div
        className={`flex flex-col gap-3 px-6 w-full max-w-screen-xl md:px-12`}
      >
        {children}
      </div>
    </section>
  );
}

function HalfWidth({
  children,
  colorScheme,
  imagePosition,
  imageSource,
  centerContent,
  headerPadding,
  ref,
}: {
  children: React.ReactNode;
  colorScheme: SectionColorScheme;
  imagePosition: SectionImagePosition;
  imageSource: string;
  centerContent: boolean;
  headerPadding: boolean;
  ref: RefObject<HTMLElement>;
}) {
  const [slideMode] = useUserInterfaceState(
    useShallow((state) => [state.slideMode])
  );

  return (
    <section
      ref={ref}
      className={`flex flex-col md:flex-row ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      } ${slideMode && "min-h-dvh"} ${colorSchemes[colorScheme]}`}
    >
      <div
        className={`flex relative h-60 md:w-1/2 ${
          slideMode ? "md:min-h-dvh" : "md:h-auto"
        }`}
      >
        <Image
          src={imageSource}
          alt=""
          fill={true}
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 50vw, 100vw"
        />
      </div>
      <div
        className={`flex flex-col items-center px-6 py-6 md:py-12 md:px-12 md:w-1/2 md:max-w-[40rem]
        } ${slideMode && centerContent && "md:justify-center"} ${
          headerPadding && "pt-3 md:pt-9"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  title,
  preamble,
}: {
  title: string;
  preamble?: string;
}) {
  return (
    <header className="flex flex-col gap-3 w-full">
      <h2 className="font-header-slab text-shb-title-2">{title}</h2>
      {preamble && (
        <p className="font-ingresso-slab text-shb-title-5 font-light max-w-3xl">
          {preamble}
        </p>
      )}
    </header>
  );
}

export function SubSection({
  title,
  children,
  headerPadding = false,
}: {
  title?: string;
  children: React.ReactNode;
  headerPadding?: boolean;
}) {
  return (
    <div className={`flex flex-col ${headerPadding && "md:pt-3"}`}>
      {title && <h3 className="font-header-slab text-shb-title-4">{title}</h3>}
      {children}
    </div>
  );
}
