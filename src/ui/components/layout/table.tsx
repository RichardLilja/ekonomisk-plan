const gridCols = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10",
  "grid-cols-11",
  "grid-cols-12",
];

const colSpan = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
  "col-span-8",
  "col-span-9",
  "col-span-10",
  "col-span-11",
  "col-span-12",
];

export function Table({
  children,
  cols,
}: {
  children: React.ReactNode;
  cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}) {
  return <table className={`grid ${gridCols[cols - 1]}`}>{children}</table>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="grid grid-cols-subgrid col-[1/-1] px-6 py-3 pt-4 rounded-t-lg bg-shb-hb2-light">
      <tr className="grid grid-cols-subgrid col-[1/-1] text-left">
        {children}
      </tr>
    </thead>
  );
}

export function TableHeaderCell({
  label,
  unit,
  span = 1,
}: {
  label: string;
  unit: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}) {
  return (
    <th className={`flex flex-col ${colSpan[span - 1]}`}>
      <span className="text-shb-title-10 font-bold">{label}</span>
      <span className="text-shb-text-3">{unit}</span>
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="grid grid-cols-subgrid col-[1/-1]">{children}</tbody>
  );
}

export function TableRow({
  children,
  first = false,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <tr
      className={`grid grid-cols-subgrid col-[1/-1] py-3 ${
        !first && "border-t border-shb-gray-10"
      }`}
    >
      {children}
    </tr>
  );
}

export function TableDataCell({
  footer = false,
  first = false,
  span = 1,
  children,
}: {
  footer?: boolean;
  first?: boolean;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: React.ReactNode;
}) {
  if (footer) {
    return (
      <td className={`text-shb-title-10 font-bold ${colSpan[span - 1]}`}>
        {children}
      </td>
    );
  }
  return (
    <td className={`${colSpan[span - 1]} ${first && "pl-6"}`}>
      <span className="hover:font-bold cursor-pointer">{children}</span>
    </td>
  );
}

export function TableFooter({ children }: { children: React.ReactNode }) {
  return (
    <tfoot className="bg-shb-gray-5 grid grid-cols-subgrid col-[1/-1] px-6 py-3 rounded-b-lg">
      <tr className="grid grid-cols-subgrid col-[1/-1]">{children}</tr>
    </tfoot>
  );
}

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-3">{children}</ul>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-lg bg-shb-hb2-light p-3">
      <dl className="grid grid-cols-auto justify-between">{children}</dl>
    </li>
  );
}

export function ListItemValue({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-shb-title-10 p-3 pb-0 font-bold">{label}</dt>
      <dd className="text-shb-text-1 p-3 pt-0">{children}</dd>
    </div>
  );
}

export function ListFooterItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-lg p-3 bg-shb-gray-5">
      <dl>{children}</dl>
    </li>
  );
}

export function ListFooterItemValue({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-shb-title-10 p-3 pb-0">{label}</dt>
      <dd className="text-shb-title-5 p-3 pt-0">{children}</dd>
    </div>
  );
}
