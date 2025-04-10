"use client";

import styles from "./page.module.css";
import { navigateNewRequest } from "./action";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "react-data-table-component";
// import { useEffect, useState } from "react";

interface Row {
  title: string;
  patientName: string;
  priority: string;
  status: string;
  requestId: number;
}

const columns = [
  {
    name: "Title",
    selector: (row: Row) => row.title,
    sortable: true,
  },
  {
    name: "Patient",
    selector: (row: Row) => row.patientName,
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
  //   {
  //     name: "Actions",
  //     cell: (row: Row) => (
  //       <button
  //         onClick={() => handleUpdateArticle(row.requestId)}
  //         className="update-container"
  //       ></button>
  //     ),
  //     button: true,
  //   },
];

export default function Requests() {
  //     const [records, setRecords] = useState([])

  //   useEffect(() => {
  //     const getInitialData = () => {
  //         setRecords(getRequests.data)
  //     }
  //   }, []);

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
          data={[]}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
}
