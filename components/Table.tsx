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
import Thead from "./table/Thead";
import Trow from "./table/Trow";
import Pagination from "./pagination/Pagination";
import PreLoader from "./PreLoader";
import Modal from "./Modal";

type person = {
  id: number;
  name: string;
  email: string;
  phone: string;
};
export interface cellObjType {
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
  action: React.ReactNode;
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
  columnHelper.accessor((row) => row.name, {
    id: "action",
    cell: (info) => <Modal data={info.getValue()} />,
    header: () => "action",
  }),
];

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData(responseData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched
    }
  };
  const table = useReactTable({
    data,
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
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <div className="flex flex-col  items-center justify-center">
            <table className="m-auto border w-full   mt-5">
              <Thead table={table} />
              <Trow table={table} />
            </table>
            <div />
          </div>
          <Pagination table={table} />
        </>
      )}
    </div>
  );
};

export default Table;
