import React, { useEffect, useState } from "react";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  // new imports: for sorting
  getSortedRowModel,
  SortingState,
  //new import: for pagiantion
  getPaginationRowModel,
} from "@tanstack/react-table";
import { data as mockData } from "@/data";
import Image from "next/image";

type person = {
  id: number;
  name: string;
  email: string;
  phone: string;
};
interface cellObjType {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  url: string;
  created: string;
  episode: [];
}

const columnHelper = createColumnHelper<cellObjType>();

const columns = [
  // One way
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    cell: (info) => (
      <Image
        src={info.getValue()}
        width={50}
        height={50}
        priority={false}
        loading="lazy"
        className="rounded object-cover h-16 w-16"
        alt={info.getValue()}
      />
    ),
  }),
  //   Another approch
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>status</span>,
  }),
  columnHelper.accessor((row) => row.gender, {
    id: "gender",
    cell: (info) => info.renderValue(),
    header: () => "gender",
  }),
];

const Table = () => {
  // const [data] = useState(() => [...mockData]);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data.results); // Assuming you want to set the fetched data in your state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
    },
    // initial items per page
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // initialize pagination function
    getPaginationRowModel: getPaginationRowModel(),
  });

  // todo make with real data
  return (
    <div className=" h-screen w-screen px-10">
      <div className="flex flex-col  items-center justify-center">
        <table className="m-auto border w-full bg-gray-300  mt-5">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b text-gray-800 uppercase"
              >
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div />
      </div>
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
    </div>
  );
};

export default Table;
