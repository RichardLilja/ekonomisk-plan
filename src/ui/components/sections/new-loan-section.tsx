import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useShallow } from "zustand/shallow";
import Section, { SectionHeader, SubSection } from "../layout/section";
import useEconomicPlanState, { Act, Loan } from "@/stores/economic-plan-store";
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
  TableHeaderControllerCell,
  TableRow,
} from "../layout/table";
import { sumInterestForAct, sumInterestForLoan } from "@/utils/interest";
import { sumDebtForAct } from "@/utils/debt";
import {
  calculateLegalCost,
  calculateLoanToValueRatio,
  fetchPeriodLabel,
} from "@/utils/loan";
import {
  calculateCashDeposit,
  ruleEnoughAmortization,
  ruleHighAmortization,
} from "@/utils/act";
import { ActRuleList, ManualActRule } from "../molecules/act-rule";
import { ContractRules } from "./acts-section";
import Switch from "../atoms/switch";
import {
  calculateExciseDuty,
  calculateNewMortgageDeeds,
} from "@/utils/mortgage-deed";
import { TableInput } from "../atoms/input";
import useUserInterfaceState from "@/stores/ui-store";
import { TableSelect } from "../atoms/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/components/atoms/dropdown";
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import Button from "../atoms/button";

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
        <div>
          <LoanTableRules act={act} />
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
          className="font-header-slab text-shb-title-4 text-interactive text-left w-full p-3 hover:bg-shb-hb2-light rounded-lg"
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
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );
  const [counselling] = useUserInterfaceState(
    useShallow((state) => [state.counselling])
  );
  const valElement = useRef<HTMLElement | null>(null);

  function updateValuation(newValue: string) {
    const newAct = { ...act };
    let sanitizedValue = Number(newValue.replace(/\s/g, ""));

    if (isNaN(sanitizedValue)) {
      sanitizedValue = 0;
    }

    newAct.valuation = sanitizedValue;

    insertAct(newAct);
  }

  return (
    <div className="p-6 bg-shb-hb2-light rounded-lg">
      <ul className="flex flex-col gap-6 lg:gap-12 lg:flex-row">
        <li className="lg:min-w-40">
          <h4 className="text-shb-title-10">Värdering</h4>
          {counselling ? (
            <>
              <span
                ref={valElement}
                className="text-shb-title-5 text-interactive hover:bg-shb-hb5-light"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(event) => {
                  updateValuation(event.target.innerText);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
              >
                {numberWithSpaces(act.valuation)}
              </span>{" "}
              <span className="text-shb-title-5 text-interactive">SEK</span>
            </>
          ) : (
            <>
              <span className="text-shb-title-5">
                {numberWithSpaces(act.valuation)}
              </span>{" "}
              <span className="text-shb-title-5">SEK</span>
            </>
          )}
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Kontantinsats</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(calculateCashDeposit(act))} SEK
          </span>
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
          <h4 className="text-shb-title-10">Befintliga pantbrev</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(act.mortgageDeed)} SEK
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Nya pantbrev</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(calculateNewMortgageDeeds(act))} SEK
          </span>
        </li>
        <li className="lg:border-l lg:border-black lg:pl-12">
          <h4 className="text-shb-title-10">Inskrivningskostnader</h4>
          <span className="text-shb-title-5">
            {numberWithSpaces(
              calculateExciseDuty(act) + calculateLegalCost(act) + 1500
            )}{" "}
            SEK
          </span>
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
          <TableDataCell>
            {numberWithSpaces(calculateExciseDuty(act))}
          </TableDataCell>
          <TableDataCell>750</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>Lagfartskostnad</TableDataCell>
          <TableDataCell>
            {numberWithSpaces(calculateLegalCost(act))}
          </TableDataCell>
          <TableDataCell>750</TableDataCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableDataCell footer={true}></TableDataCell>
        <TableDataCell footer={true}>
          {numberWithSpaces(calculateExciseDuty(act) + calculateLegalCost(act))}
        </TableDataCell>
        <TableDataCell footer={true}>1500</TableDataCell>
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
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );
  const [counselling] = useUserInterfaceState(
    useShallow((state) => [state.counselling])
  );
  const [deleteMode, setDeleteMode] = useState(false);

  const loanPeriodOptions = [
    { value: 0, label: fetchPeriodLabel(0) },
    { value: 1, label: fetchPeriodLabel(1) },
    { value: 2, label: fetchPeriodLabel(2) },
    { value: 3, label: fetchPeriodLabel(3) },
    { value: 4, label: fetchPeriodLabel(4) },
    { value: 5, label: fetchPeriodLabel(5) },
    { value: 6, label: fetchPeriodLabel(6) },
  ];

  function handleBlur(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    loan: Loan,
    key: keyof typeof loan
  ) {
    const newAct = { ...act };
    const index = newAct.loans.findIndex((l) => l.id === loan.id);

    if (index < 0) {
      return;
    }

    const newLoan = { ...newAct.loans[index] };

    if (key === "debt" || key === "amortization") {
      const newValue = Number(event.target.value.replace(/\s/g, ""));
      if (!Number(newValue)) {
        return;
      }
      newLoan[key] = newValue;
      event.target.value = numberWithSpaces(newValue);
    } else if (key === "periodIndex") {
      const newValue = Number(event.target.value);
      newLoan[key] = newValue;
    }

    newAct.loans.splice(index, 1, newLoan);

    insertAct(newAct);
  }

  function deleteLoan(index: number) {
    const newAct = { ...act };
    newAct.loans.splice(index, 1);
    insertAct(newAct);
  }

  return (
    <Table>
      <TableHead hasController={true}>
        <TableHeaderCell label="Skuld" unit="SEK" />
        <TableHeaderCell label="Ränta" unit="%" />
        <TableHeaderCell label="Räntekostnad" unit="SEK / månad" />
        <TableHeaderCell label="Löptid" unit="period" />
        <TableHeaderCell label="Utgångsdag" unit="Datum" />
        <TableHeaderCell label="Amortering" unit="SEK / månad" />
        <TableHeaderControllerCell>
          {counselling && (
            <div className="flex justify-end pr-6">
              <TableHeaderDropdownMenu
                act={act}
                deleteMode={deleteMode}
                setDeleteMode={setDeleteMode}
              />
            </div>
          )}
        </TableHeaderControllerCell>
      </TableHead>
      <TableBody>
        {act.loans.map((loan, index) => {
          return (
            <TableRow
              key={loan.id}
              first={index === 0}
              hasController={deleteMode}
            >
              <TableDataCell>
                {counselling ? (
                  <TableInput
                    defaultValue={numberWithSpaces(loan.debt)}
                    onBlurHandler={(event) => {
                      handleBlur(event, loan, "debt");
                    }}
                  />
                ) : (
                  numberWithSpaces(loan.debt)
                )}
              </TableDataCell>
              <TableDataCell>
                {act.interestRates[loan.periodIndex]}
              </TableDataCell>
              <TableDataCell>
                {numberWithSpaces(sumInterestForLoan(act, loan))}
              </TableDataCell>
              <TableDataCell>
                {counselling ? (
                  <TableSelect
                    value={loan.periodIndex}
                    options={loanPeriodOptions}
                    onChangeHandler={(event) => {
                      handleBlur(event, loan, "periodIndex");
                    }}
                  />
                ) : (
                  fetchPeriodLabel(loan.periodIndex)
                )}
              </TableDataCell>
              <TableDataCell>{loan.expireDate}</TableDataCell>
              <TableDataCell>
                {counselling ? (
                  <TableInput
                    defaultValue={numberWithSpaces(loan.amortization)}
                    onBlurHandler={(event) => {
                      handleBlur(event, loan, "amortization");
                    }}
                  />
                ) : (
                  numberWithSpaces(loan.amortization)
                )}
              </TableDataCell>
              {deleteMode && (
                <td className="w-full bg-background">
                  <div className="flex justify-end pr-6">
                    <Button
                      variant="danger"
                      size="small"
                      onClickHandler={() => {
                        deleteLoan(index);
                      }}
                    >
                      Ta bort
                    </Button>
                  </div>
                </td>
              )}
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
          <span
            className={`${!ruleEnoughAmortization(act).pass && "text-danger"}`}
          >
            {numberWithSpaces(sumAmortizationForAct(act))}
          </span>
        </TableDataCell>
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

export function LoanTableRules({ act }: { act: Act }) {
  const response = ruleEnoughAmortization(act);

  if (response.pass) {
    return null;
  }

  return (
    <ActRuleList>
      <ManualActRule icon="thumbs-down">{response.text}</ManualActRule>
    </ActRuleList>
  );
}

function TableHeaderDropdownMenu({
  act,
  deleteMode,
  setDeleteMode,
}: {
  act: Act;
  deleteMode: boolean;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [insertAct] = useEconomicPlanState(
    useShallow((state) => [state.currentPlan.insertAct])
  );

  const defaultNewLoan: Loan = {
    id: "",
    debt: 0,
    periodIndex: 0,
    expireDate: "",
    amortization: 0,
  };

  function addLoan(event: Event) {
    const newAct = { ...act };
    const newLoan = { ...defaultNewLoan };

    newLoan.id = act.id + "-" + Math.random().toString(16).slice(2);
    newAct.loans.push(newLoan);

    insertAct(newAct);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild={true}>
        <button className="flex justify-center items-center w-12 h-12 rounded-lg text-interactive hover:bg-shb-hb5-light data-[state=open]:bg-shb-hb5-light">
          <EllipsisVerticalIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-shb-white shadow-none border-shb-gray-15">
        <DropdownMenuLabel>Lån</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={addLoan}
          className="text-interactive hover:bg-shb-hb2-light"
        >
          Lägg till lån
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setDeleteMode(!deleteMode);
          }}
          className="text-interactive hover:bg-shb-hb2-light"
        >
          Ta bort{" : "}
          {deleteMode ? (
            <span className="font-bold">PÅ</span>
          ) : (
            <span className="font-bold">AV</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-interactive hover:bg-shb-hb2-light">
          Lägg till säkerhet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
