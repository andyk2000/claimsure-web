"use client";

import styles from "./page.module.css";
import { navigateNewRequest, getRequests } from "./action";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Row {
  patient: { names: string };
  title: string;
  patientName: string;
  priority: string;
  status: string;
  requestId: number;
  id: number;
}

const columns = [
  {
    name: "Title",
    selector: (row: Row) => row.title,
    sortable: true,
    cell: (row: Row) => (
      <span
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => handleClick(row.id)}
      >
        {row.title}
      </span>
    ),
  },
  {
    name: "Patient",
    selector: (row: Row) => row.patient.names,
    sortable: true,
  },
  {
    name: "Priority",
    selector: (row: Row) => row.priority,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: Row) => row.status,
    sortable: true,
  },
];

export default function Requests() {
  const router = useRouter();

  const handleClick = (id: number) => {};

  const [records, setRecords] = useState([]);
  useEffect(() => {
    const getInitialData = async () => {
      const results = await getRequests();
      if (results.data.length > 0) {
        setRecords(results.data);
      }
    };
    getInitialData();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <p>Welcome back, Dr Bayingana</p>
        </div>
        <button className={styles.newAppealButton} onClick={navigateNewRequest}>
          New Request
        </button>
      </div>
      <div className={styles.searchBar}>
        <input
          className={styles.searchField}
          placeholder="Search by title........"
        />
        <button className={styles.searchButton}>
          <Icon
            icon="ph:magnifying-glass-bold"
            width="30"
            height="30"
            color="#242e8f"
          />
        </button>
      </div>
      <div className={styles.tableContainer}>
        <DataTable
          className="table"
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
}

function handleClick(id: number): void {
  throw new Error("Function not implemented.");
}
