import { RefObject } from "react";
import { useShallow } from "zustand/shallow";
import Section, { SectionHeader, SubSection } from "../layout/section";
import useEconomicPlanState, { Act } from "@/stores/economic-plan-store";
import {
  calculateMinAmortization,
  calculateMinAmortizationSum,
  sumAmortizationForAct,
} from "@/utils/amortization";
import { convertToPercent, numberWithSpaces } from "@/utils/formatting";
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
import { sumInterestForAct, sumInterestForLoan } from "@/utils/interest";
import { sumDebtForAct } from "@/utils/debt";
import { calculateLoanToValueRatio } from "@/utils/loan";
import { ruleHighAmortization } from "@/utils/act";
import { ActRuleList, ManualActRule } from "../molecules/act-rule";
import { ContractRules } from "./acts-section";
import Switch from "../atoms/switch";

export default function NewLoanSection({
  ref,
}: {
  ref: RefObject<HTMLElement>;
}) {
  const [economicPlan] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan])
  );

  return (
    <Section ref={ref} headerPadding={true} colorScheme="hb5-light">
      <SectionHeader title="Ditt nya lån" />
      <SubSection>
        <div className="flex flex-col gap-3 md:pt-3">
          {economicPlan.acts.map((act) => {
            if (act.new) {
              return <NewActContainer key={act.id} act={act} />;
            }
          })}
        </div>
      </SubSection>
    </Section>
  );
}

function NewActContainer({ act }: { act: Act }) {
  return (
    <section className="rounded-lg bg-white">
      <Header act={act} />
      <div className="flex flex-col gap-3 p-6 pt-0">
        <Economy act={act} />
        <LoanToValue act={act} />
        <AmortizationRules act={act} />
        <MortgageDeed act={act} />
        <div className="hidden md:block">
          <MortgageTable act={act} />
        </div>
        <div className="md:hidden">
          <h4 className="font-header-slab text-shb-title-5 pt-3 pb-3">
            Kostnader
          </h4>
          <MortgageTableSmall act={act} />
        </div>
        <Contract act={act} />
        <ContractRules act={act} />
        <div className="hidden lg:block">
          <LoanTable act={act} />
        </div>
        <div className="lg:hidden">
          <h4 className="font-header-slab text-shb-title-5 pt-3 pb-3">Lån</h4>
          <LoanTableSmall act={act} />
        </div>
      </div>
    </section>
  );
}

function Header({ act }: { act: Act }) {
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );

  return (
    <>
      <header className="p-3">
        <input
          className="font-header-slab text-shb-title-4 text-left w-full p-3 hover:bg-shb-hb2-light rounded-lg"
          type="text"
          defaultValue={act.object}
          onBlur={(event) => {
            const newAct = { ...act };
            newAct.object = event.target.value;
            insertAct(newAct);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
        />
      </header>
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
    </>
  );
}

function Economy({ act }: { act: Act }) {
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
          <h4 className="text-shb-title-10">Kontantinsats</h4>
          <span className="text-shb-title-5"># SEK</span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Sökt belopp</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(sumDebtForAct(act))} SEK
          </span>
        </li>
      </ul>
    </div>
  );
}

function LoanToValue({ act }: { act: Act }) {
  const minAmortization = calculateMinAmortization(act);
  const minAmortizationSum = calculateMinAmortizationSum(act);

  return (
    <div className="p-6 bg-shb-hb2-light rounded-lg">
      <ul className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
        <li className="lg:min-w-40">
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
      </ul>
    </div>
  );
}

function MortgageDeed({ act }: { act: Act }) {
  return (
    <div className="p-6 bg-shb-hb2-light rounded-lg">
      <ul className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
        <li className="lg:min-w-40">
          <h4 className="text-shb-title-10">Nya pantbrev</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(act.mortgageDeed)} SEK
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Inskrivningskostnader</h4>
          <span className="text-shb-title-5"># SEK</span>
        </li>
      </ul>
    </div>
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

function MortgageTable({ act }: { act: Act }) {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell label="Kostnadstyp" unit="" />
        <TableHeaderCell label="Stämpelskatt" unit="SEK" />
        <TableHeaderCell label="Administrationsavgift" unit="SEK" />
      </TableHead>
      <TableBody>
        <TableRow first={true}>
          <TableDataCell>Pantbrevskostnad</TableDataCell>
          <TableDataCell>#</TableDataCell>
          <TableDataCell>#</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>Pantbrevskostnad</TableDataCell>
          <TableDataCell>#</TableDataCell>
          <TableDataCell>#</TableDataCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableDataCell footer={true}></TableDataCell>
        <TableDataCell footer={true}>#</TableDataCell>
        <TableDataCell footer={true}>#</TableDataCell>
      </TableFooter>
    </Table>
  );
}

function MortgageTableSmall({ act }: { act: Act }) {
  return (
    <List>
      <ListItem>
        <ListItemValue label="Kostnadstyp">Pantbrevskostnad</ListItemValue>
        <ListItemValue label="Stämpelskatt">14 000 SEK</ListItemValue>
        <ListItemValue label="Administrationsavgift">750 SEK</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemValue label="Kostnadstyp">Lagfartskostnad</ListItemValue>
        <ListItemValue label="Stämpelskatt">14 000 SEK</ListItemValue>
        <ListItemValue label="Administrationsavgift">750 SEK</ListItemValue>
      </ListItem>
      <ListFooterItem>
        <ListFooterItemValue label="Total stämpelskatt">
          28 000 SEK
        </ListFooterItemValue>
        <ListFooterItemValue label="Total Administrationsavgift">
          1 500 SEK
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
              <TableDataCell>{convertToPercent(loan.interest)}</TableDataCell>
              <TableDataCell>
                {numberWithSpaces(sumInterestForLoan(loan))}
              </TableDataCell>
              <TableDataCell>{loan.period}</TableDataCell>
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
        <TableDataCell footer={true}>
          {numberWithSpaces(sumAmortizationForAct(act))}
        </TableDataCell>
        <TableDataCell footer={true}></TableDataCell>
      </TableFooter>
    </Table>
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
              {convertToPercent(loan.interest)} %
            </ListItemValue>
            <ListItemValue label="Räntekostnad">
              {numberWithSpaces(sumInterestForLoan(loan))} SEK / mån
            </ListItemValue>
            <ListItemValue label="Löptid">{loan.period}</ListItemValue>
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

export function AmortizationRules({ act }: { act: Act }) {
  const response = ruleHighAmortization(act);

  if (response.pass) {
    return null;
  }

  return (
    <ActRuleList>
      <ManualActRule icon="thumbs-down">{response.text}</ManualActRule>
    </ActRuleList>
  );
}
