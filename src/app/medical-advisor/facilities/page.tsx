"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

export default function MedicalAdvisorFacilities() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Medical Facilities</h1>
          <p className={styles.subtitle}>View healthcare facilities</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Icon icon="ph:magnifying-glass" width="20" height="20" />
            <input type="text" placeholder="Search facilities..." />
          </div>
          <div className={styles.filterButton}>
            <Icon icon="ph:funnel" width="20" height="20" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      
      <div className={styles.facilitiesGrid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className={styles.facilityCard}>
            <div className={styles.facilityHeader}>
              <div className={styles.facilityIcon}>
                <Icon icon="ph:hospital" width="24" height="24" color="#242e8f" />
              </div>
              <div className={styles.facilityStatus}>Active</div>
            </div>
            <h3 className={styles.facilityName}>General Hospital {item}</h3>
            <p className={styles.facilityAddress}>123 Medical Drive, Healthcare City</p>
            <div className={styles.facilityStats}>
              <div className={styles.facilityStat}>
                <span className={styles.facilityStatLabel}>Doctors</span>
                <span className={styles.facilityStatValue}>{20 + item}</span>
              </div>
              <div className={styles.facilityStat}>
                <span className={styles.facilityStatLabel}>Requests</span>
                <span className={styles.facilityStatValue}>{45 + (item * 3)}</span>
              </div>
            </div>
            <div className={styles.facilityActions}>
              <button className={styles.facilityActionButton}>
                <Icon icon="ph:eye" width="18" height="18" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



