import { Table } from "@tanstack/react-table";
import React from "react";
import { cellObjType } from "../Table";

const Pagination: React.FC<{ table: Table<cellObjType> }> = ({ table }) => {
  return (
    <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
      <div className="sm:mr-auto sm:mb-0 mb-2">
        <span className="mr-2">Items per Page</span>
        <select
          className="border p-1 rounded w-16 border-gray-200"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 2, 4, 6, 8].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className={`${
            !table.getCanPreviousPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="w-5 h-5">{"<<"}</span>
        </button>
        <button
          className={`${
            !table.getCanPreviousPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="w-5 h-5">{"<"}</span>
        </button>
        <span className="flex items-center gap-1">
          <input
            min={1}
            max={table.getPageCount()}
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-10"
          />
          of {table.getPageCount()}
        </span>
        <button
          className={`${
            !table.getCanNextPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="w-5 h-5">{">"}</span>
        </button>
        <button
          className={`${
            !table.getCanNextPage()
              ? "bg-gray-100"
              : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
          } rounded p-1`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="w-5 h-5">{">>"}</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
