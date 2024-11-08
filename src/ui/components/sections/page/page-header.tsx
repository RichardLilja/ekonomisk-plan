import useEconomicPlanState from "@/stores/economic-plan-store";
import Image from "next/image";
import { RefObject, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function PageHeader({
  imageSource,
  title,
  ref,
}: {
  imageSource: string;
  title: string;
  ref: RefObject<HTMLElement>;
}) {
  return (
    <header ref={ref} className="flex flex-col bg-shb-hb2-light">
      <TopBar />
      <div className="relative w-dvw h-[calc(100dvh-6rem)] md:h-[calc(100dvh-9.75rem)]">
        <Image
          src={imageSource}
          alt=""
          fill={true}
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="flex justify-between items-center py-6 md:justify-center md:py-9">
        <div className="flex items-end px-6 md:px-12 md:w-full md:max-w-screen-xl">
          <Title title={title} />
          <CustomerInformation />
        </div>
      </div>
    </header>
  );
}

function CustomerInformation() {
  const [customer] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.customers[0]])
  );

  return (
    <div className="hidden lg:flex items-end h-12 border-l border-black">
      <ul className="flex gap-4">
        <li className="pl-4 py-1 border-black text-shb-text-1 font-bold">
          {customer?.name}
        </li>
        <li className="pl-4 py-1 border-l border-black text-shb-text-1">
          {customer?.id}
        </li>
        <li className="pl-4 py-1 border-l border-black text-shb-text-1">
          {customer?.city}
        </li>
      </ul>
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div>
      <Logo />
      <h1 className="font-header-slab text-shb-title-5 leading-none text-shb-hb1 md:text-shb-title-1 md:pr-12">
        {title}
      </h1>
    </div>
  );
}

function Logo() {
  return (
    <Image
      src="/handelsbanken-logo.png"
      alt=""
      width={184}
      height={20}
      className="h-3 w-auto md:h-4"
    />
  );
}

function TopBar() {
  return (
    <div className="flex w-dvw">
      <div className="h-3 flex-1 bg-shb-hb6"></div>
      <div className="h-3 flex-1 bg-shb-hb1"></div>
      <div className="h-3 flex-1 bg-shb-hb4"></div>
      <div className="h-3 flex-1 bg-shb-hb2-light"></div>
    </div>
  );
}
