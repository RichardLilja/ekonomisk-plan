import { HTMLProps } from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="table-fixed rounded-lg overflow-hidden border-collapse">
      {children}
    </table>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="w-full">
      <tr className="w-full">
        {children}
        <th className="w-full bg-shb-hb2-light" aria-hidden={true}></th>
      </tr>
    </thead>
  );
}

export function TableHeaderCell({
  label,
  unit,
  width = "min-w-0",
}: {
  label: string;
  unit: string;
  width?: string;
}) {
  return (
    <th className={`${width} px-6 py-3 pt-4 bg-shb-hb2-light`}>
      <div className="flex flex-col items-start">
        <span className="text-shb-title-10 font-bold">{label}</span>
        <span className="text-shb-text-3">{unit}</span>
      </div>
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  first = false,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <tr className={`${!first && "border-t border-shb-gray-10"}`}>
      {children}
      <td className="w-full bg-background" aria-hidden={true}></td>
    </tr>
  );
}

export function TableDataCell({
  footer = false,
  children,
}: {
  footer?: boolean;
  children?: React.ReactNode;
}) {
  if (footer) {
    return (
      <td className="text-shb-title-10 font-bold bg-shb-gray-5 whitespace-nowrap">
        <div className="px-6 py-3">{children}</div>
      </td>
    );
  }
  return (
    <td className="px-6 py-3 text-shb-text-1 bg-background whitespace-nowrap hover:font-bold">
      <span>{children}</span>
    </td>
  );
}

export function TableFooter({ children }: { children: React.ReactNode }) {
  return (
    <tfoot>
      <tr className="border-t border-shb-gray-10">
        {children}
        <td className="w-full bg-shb-gray-5" aria-hidden={true}></td>
      </tr>
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
