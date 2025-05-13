"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

export default function MedicalAdvisorRequests() {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Medical Requests</h1>
          <p className={styles.subtitle}>Manage and review medical requests</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Icon icon="ph:magnifying-glass" width="20" height="20" />
            <input type="text" placeholder="Search requests..." />
          </div>
          <div className={styles.filterButton}>
            <Icon icon="ph:funnel" width="20" height="20" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Requests
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'pending' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'approved' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'rejected' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>
      
      <div className={styles.requestsTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderCell}>Request ID</div>
          <div className={styles.tableHeaderCell}>Patient</div>
          <div className={styles.tableHeaderCell}>Doctor</div>
          <div className={styles.tableHeaderCell}>Type</div>
          <div className={styles.tableHeaderCell}>Date</div>
          <div className={styles.tableHeaderCell}>Status</div>
          <div className={styles.tableHeaderCell}>Actions</div>
        </div>
        
        <div className={styles.tableBody}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}>#REQ-2023-001</div>
            <div className={styles.tableCell}>John Smith</div>
            <div className={styles.tableCell}>Dr. James Wilson</div>
            <div className={styles.tableCell}>Dialysis Treatment</div>
            <div className={styles.tableCell}>Oct 15, 2023</div>
            <div className={styles.tableCell}>
              <span className={styles.statusBadge} style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                Pending
              </span>
            </div>
            <div className={styles.tableCell}>
              <button className={styles.actionButton}>
                <Icon icon="ph:eye" width="18" height="18" />
              </button>
              <button className={styles.actionButton}>
                <Icon icon="ph:pencil-simple" width="18" height="18" />
              </button>
            </div>
          </div>
          
          {/* Add more rows as needed */}
        </div>
      </div>
    </div>
  );
}