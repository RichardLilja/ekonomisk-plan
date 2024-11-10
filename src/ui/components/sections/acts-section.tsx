import { RefObject, useState } from "react";
import Section, { SectionHeader, SubSection } from "../layout/section";
import { useShallow } from "zustand/shallow";
import { ChevronDown, ChevronUp } from "lucide-react";
import { convertToPercent, numberWithSpaces } from "@/utils/formatting";
import { sumInterestForAct, sumInterestForLoan } from "@/utils/interest";
import { sumDebtForAct } from "@/utils/debt";
import {
  calculateMinAmortization,
  calculateMinAmortizationSum,
  sumAmortizationForAct,
} from "@/utils/amortization";
import { calculateLoanToValueRatio, fetchPeriodLabel } from "@/utils/loan";
import useEconomicPlanState, { Act } from "@/stores/economic-plan-store";
import {
  List,
  ListFooterItem,
  ListFooterItemValue,
  ListItem,
  ListItemValue,
  Table,
  TableBody,
  TableDataCell,
  TableFooter,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../layout/table";
import {
  ruleEnergyClass,
  ruleHighAmortization,
  ruleMortgageDeedAvailable,
} from "@/utils/act";
import { ActRule, ActRuleList, ManualActRule } from "../molecules/act-rule";
import Switch from "../atoms/switch";

export default function ActsSection({ ref }: { ref: RefObject<HTMLElement> }) {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan, state.planUpdated])
  );

  return (
    <Section ref={ref} headerPadding={true} colorScheme="hb5-light">
      <SectionHeader title="Akter" />
      <SubSection>
        <div className="flex flex-col gap-3 md:pt-3">
          {economicPlan.acts.map(
            (act) => !act.new && <ActContainer key={act.object} act={act} />
          )}
        </div>
      </SubSection>
    </Section>
  );
}

function ActContainer({ act }: { act: Act }) {
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );
  const [display, setDisplay] = useState(false);

  return (
    <section className="rounded-lg bg-white">
      <header>
        <button
          onClick={() => {
            setDisplay(!display);
          }}
          className="flex justify-between items-center font-header-slab text-shb-title-4 text-shb-hb1 text-left w-full p-6"
        >
          {act.object}
          {display ? (
            <ChevronUp className="text-shb-hb1" />
          ) : (
            <ChevronDown className="text-shb-hb1" />
          )}
        </button>
      </header>
      {display && (
        <div className="p-6 pt-0">
          <div className="px-6 py-3 border rounded-lg">
            <Switch
              justify="start"
              label="Använd i ekonomiberäkningar"
              checked={act.usedInCalculations}
              onCheckedChange={(checked) => {
                const newAct = { ...act };
                newAct.usedInCalculations = checked;
                insertAct(newAct);
              }}
            />
          </div>
        </div>
      )}
      {display && <ActContent act={act} />}
    </section>
  );
}

function ActContent({ act }: { act: Act }) {
  return (
    <div className="flex flex-col gap-3 p-6 pt-0">
      <Economy act={act} />
      <EconomyRules act={act} />
      <Contract act={act} />
      <ContractRules act={act} />
      <Loans act={act} />
    </div>
  );
}

function Loans({ act }: { act: Act }) {
  return (
    <>
      <div className="hidden md:block">
        <LoanTable act={act} />
      </div>
      <div className="md:hidden">
        <h4 className="font-header-slab text-shb-title-5 pt-3 pb-3">Lån</h4>
        <LoanTableSmall act={act} />
      </div>
    </>
  );
}

function LoanTableSmall({ act }: { act: Act }) {
  return (
    <List>
      {act.loans.map((loan) => {
        return (
          <ListItem key={loan.id}>
            <ListItemValue label="Skuld">
              {numberWithSpaces(loan.debt)} SEK
            </ListItemValue>
            <ListItemValue label="Ränta">
              {act.interestRates[loan.periodIndex]} %
            </ListItemValue>
            <ListItemValue label="Räntekostnad">
              {numberWithSpaces(sumInterestForLoan(act, loan))} SEK / mån
            </ListItemValue>
            <ListItemValue label="Löptid">
              {fetchPeriodLabel(loan.periodIndex)}
            </ListItemValue>
            <ListItemValue label="Utgångsdag">{loan.expireDate}</ListItemValue>
            <ListItemValue label="Amortering">
              {numberWithSpaces(loan.amortization)} SEK / mån
            </ListItemValue>
          </ListItem>
        );
      })}
      <ListFooterItem>
        <ListFooterItemValue label="Total skuld">
          {numberWithSpaces(sumDebtForAct(act))} SEK
        </ListFooterItemValue>
        <ListFooterItemValue label="Total räntekostnad">
          {numberWithSpaces(sumInterestForAct(act))} SEK / mån
        </ListFooterItemValue>
        <ListFooterItemValue label="Total amortering">
          {numberWithSpaces(sumAmortizationForAct(act))} SEK / mån
        </ListFooterItemValue>
      </ListFooterItem>
    </List>
  );
}

function LoanTable({ act }: { act: Act }) {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell label="Skuld" unit="SEK" />
        <TableHeaderCell label="Ränta" unit="%" />
        <TableHeaderCell label="Räntekostnad" unit="SEK / månad" />
        <TableHeaderCell label="Löptid" unit="period" />
        <TableHeaderCell label="Utgångsdag" unit="Datum" />
        <TableHeaderCell label="Amortering" unit="SEK / månad" />
      </TableHead>
      <TableBody>
        {act.loans.map((loan, index) => {
          return (
            <TableRow key={loan.id} first={index === 0}>
              <TableDataCell>{numberWithSpaces(loan.debt)}</TableDataCell>
              <TableDataCell>
                {act.interestRates[loan.periodIndex]}
              </TableDataCell>
              <TableDataCell>
                {numberWithSpaces(sumInterestForLoan(act, loan))}
              </TableDataCell>
              <TableDataCell>
                {fetchPeriodLabel(loan.periodIndex)}
              </TableDataCell>
              <TableDataCell>{loan.expireDate}</TableDataCell>
              <TableDataCell>
                {numberWithSpaces(loan.amortization)}
              </TableDataCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableDataCell footer={true}>
          {numberWithSpaces(sumDebtForAct(act))}
        </TableDataCell>
        <TableDataCell footer={true}></TableDataCell>
        <TableDataCell footer={true}>
          {numberWithSpaces(sumInterestForAct(act))}
        </TableDataCell>
        <TableDataCell footer={true}></TableDataCell>
        <TableDataCell footer={true}></TableDataCell>
        <TableDataCell footer={true}>
          {numberWithSpaces(sumAmortizationForAct(act))}
        </TableDataCell>
      </TableFooter>
    </Table>
  );
}

function Contract({ act }: { act: Act }) {
  return (
    <div className="p-6 bg-shb-hb2-light rounded-lg">
      <ul className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
        <li className="lg:min-w-40">
          <h4 className="text-shb-title-10">Avtalstyp</h4>
          <span className="text-shb-title-5">{act.contractType}</span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Energiklass</h4>
          <span className="text-shb-title-5">{act.energyClass}</span>
        </li>
      </ul>
    </div>
  );
}

function Economy({ act }: { act: Act }) {
  const minAmortization = calculateMinAmortization(act);
  const minAmortizationSum = calculateMinAmortizationSum(act);

  return (
    <div className="p-6 bg-shb-hb2-light rounded-lg">
      <ul className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
        <li className="lg:min-w-40">
          <h4 className="text-shb-title-10">Värdering</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(act.valuation)} SEK
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Belåningsgrad</h4>
          <span className="text-shb-title-5">
            {convertToPercent(calculateLoanToValueRatio(act))} %
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Amorteringskrav</h4>
          <span className="text-shb-title-5">
            {convertToPercent(minAmortization)} % –{" "}
            {numberWithSpaces(minAmortizationSum)} SEK
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Pantbrev</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(act.mortgageDeed)} SEK
          </span>
        </li>
      </ul>
    </div>
  );
}

export function EconomyRules({ act }: { act: Act }) {
  const mortgageResponse = ruleMortgageDeedAvailable(act);
  const amortizationResponse = ruleHighAmortization(act);

  if (!mortgageResponse.pass && amortizationResponse.pass) {
    return null;
  }

  return (
    <ActRuleList>
      {mortgageResponse.pass && <ActRule response={mortgageResponse} />}
      {!amortizationResponse.pass && (
        <ActRule response={amortizationResponse} />
      )}
    </ActRuleList>
  );
}

export function ContractRules({ act }: { act: Act }) {
  const response = ruleEnergyClass(act);

  return (
    <ActRuleList>
      {response.pass && (
        <ManualActRule icon="thumbs-up">
          {response.text} Läs mer på{" "}
          <a className="underline text-shb-hb1" href="#">
            Energikollen
          </a>
          .
        </ManualActRule>
      )}
      {!response.pass && (
        <ManualActRule icon="information">
          {response.text} Se vad du kan göra för att få gröna avtal på{" "}
          <a className="underline text-shb-hb1" href="#">
            Energikollen
          </a>
          .
        </ManualActRule>
      )}
    </ActRuleList>
  );
}
