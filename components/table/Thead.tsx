import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import { cellObjType } from "../Table";

const Thead: React.FC<{ table: Table<cellObjType> }> = ({ table }) => {
  return (
    <thead className="py-4">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b  text-gray-800 uppercase">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-4 pr-2 py-4 font-medium text-left"
            >
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none flex min-w-[36px]"
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <span className="pl-2">↑</span>,
                    desc: <span className="pl-2">↓</span>,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Thead;
