"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <p>Welcome back, Dr Bayingana</p>
        </div>
        <div className={styles.headerRightSection}>
          <button className={styles.newAppealButton}>New Appeal</button>
          <button className={styles.notificationButton}>
            <Icon icon="simple-line-icons:bell" width="30" height="25" />
          </button>
        </div>
      </div>
    </div>
  );
}
