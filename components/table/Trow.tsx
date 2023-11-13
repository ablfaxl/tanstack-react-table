import React from "react";
import { Table as RTTable, flexRender } from "@tanstack/react-table";

const Trow = <T extends object>({ table }: { table: RTTable<T> }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="border-b bg-white even:bg-gray-100">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-4 pt-3 pb-4">
              {flexRender(
                cell.column.columnDef.cell || cell.column.id,
                cell.getContext()
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Trow;
