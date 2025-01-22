"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

export default function NewRequest() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Icon
          icon="ph:arrow-left-bold"
          width="25"
          height="25"
          className={styles.backButton}
          color="#242e8f"
        />
        <h2 className={styles.pageTitle}>New request</h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          width="25"
          height="25"
          className={styles.moreButton}
        />
      </div>
      <div className={styles.requestTitleSection}>
        <p className={styles.titleLabel}>Title</p>
        <input type="text" className={styles.titleTextInput} />
      </div>
      <div className={styles.requestPatientSection}>
        <p className={styles.patientNameLabel}>Patient Name</p>
        <input type="text" className={styles.patientNameTextInput} />
      </div>
      <div className={styles.insuranceIdSection}>
        <p className={styles.patientNameLabel}>Patient Name</p>
        <input type="text" className={styles.patientNameTextInput} />
      </div>
    </div>
  );
}
