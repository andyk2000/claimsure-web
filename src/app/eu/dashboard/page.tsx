"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import Chart from "@/components/Chart";

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <p>Welcome back, Dr Bayingana</p>
        </div>
        <div className={styles.headerRightSection}>
          <button className={styles.newAppealButton}>New Request</button>
        </div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.mainLeft}>
          <div className={styles.cardSection}>
            <div className={styles.cardContainer}>
              <Icon
                icon="ph:thumbs-up"
                width="25"
                height="25"
                color="#242e8f"
              />
              <div className={styles.cardTextContainer}>
                <p className={styles.cardText}>Approved requests</p>
                <div className={styles.cardInfo}>
                  <p className={styles.approved}>23</p>
                  <div className={styles.cardTextApproved}>
                    <Icon icon="ph:caret-up-fill" width="25" height="25" />
                    <p>4 requests</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardContainer}>
              <Icon
                icon="ph:thumbs-down"
                width="25"
                height="25"
                color="#242e8f"
              />
              <div className={styles.cardTextContainer}>
                <p className={styles.cardText}>Denied requests</p>
                <div className={styles.cardInfo}>
                  <p className={styles.approved}>4</p>
                  <div className={styles.cardTextDenied}>
                    <Icon icon="ph:caret-up-fill" width="25" height="25" />
                    <p>2 requests</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardContainerLast}>
              <Icon
                icon="ph:arrows-clockwise"
                width="25"
                height="25"
                color="#242e8f"
              />
              <div className={styles.cardTextContainer}>
                <p className={styles.cardText}>Pending requests</p>
                <div className={styles.cardInfo}>
                  <p className={styles.approved}>11</p>
                  <div className={styles.cardTextDenied}>
                    <Icon
                      icon="ph:dots-three-circle-light"
                      width="25"
                      height="25"
                      color="rgba(0,0,0,0.8)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.visualizationSection}>
            <div className={styles.chartSection}>
              <h2>Monthly approval-Chart</h2>
              <div className={styles.chartContainer}>
                <Chart />
              </div>
            </div>
            <div className={styles.chartDescriptionSection}>
              <p>
                <span>Total Request Proccessed:</span> 2034
              </p>
              <div>
                <Icon icon="ph:arrow-up" width="16" height="16" />
                <p>
                  <span>2.1%</span> vs last month
                </p>
              </div>
              <div>
                <p>Period Covered:</p>
                <select id="dropdown" name="options">
                  <option value="option1">3 Months</option>
                  <option value="option2">4 Months</option>
                  <option value="option3">6 months</option>
                  <option value="option4">1 year</option>
                </select>
              </div>
              <div>
                <Icon icon="ph:dot-outline-fill" width="24" height="24" />
                <p> Approved</p>
              </div>
              <div>
                <Icon icon="ph:dot-outline-fill" width="24" height="24" />
                <p> Denied</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
