"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import Chart from "@/components/Chart";
import { navigateNewRequest } from "./action";

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <p>Welcome back, Dr Bayingana</p>
        </div>
        <button className={styles.newAppealButton} onClick={navigateNewRequest}>
          New Request
        </button>
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
              <div className={styles.dropdownContainer}>
                <p>Period Covered:</p>
                <select
                  id="dropdown"
                  name="options"
                  className={styles.dropdownSelector}
                >
                  <option value="option1">3 Months</option>
                  <option value="option2">4 Months</option>
                  <option value="option3">6 months</option>
                  <option value="option4">1 year</option>
                </select>
              </div>
              <div>
                <h2 className={styles.descriptionTitle}>Description</h2>
                <p className={styles.descriptonTotalRequest}>
                  Total Request Proccessed: 2034
                </p>
                <div className={styles.descriptionDetails}>
                  <Icon
                    icon="ph:arrow-up"
                    width="16"
                    height="16"
                    color="#00be13"
                  />
                  <p>
                    <span>2.1%</span> vs last month
                  </p>
                </div>
                <div className={styles.legend}>
                  <Icon
                    icon="ph:dot-outline-fill"
                    width="30"
                    height="30"
                    color="#5A6ACF"
                  />
                  <p> Approved</p>
                </div>
                <div className={styles.legend}>
                  <Icon
                    icon="ph:dot-outline-fill"
                    width="30"
                    height="30"
                    color="#E6E8EC"
                  />
                  <p> Denied</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainright}>
          <div className={styles.notificationHeader}>
            <div className={styles.notificationTitle}>
              <Icon
                icon="ph:bell-fill"
                width="30"
                height="30"
                color="#5A6ACF"
              />
              <h2>Notifications</h2>
            </div>
            <div className={styles.moreNotification}>
              <p>See All</p>
              <Icon icon="ph:caret-double-right" width="20" height="20" />
            </div>
          </div>
          <div className={styles.notificationContainer}>
            <p>No notification yet</p>
          </div>
        </div>
      </div>
      <div className={styles.latestList}>
        <div className={styles.listTitleContainer}>
          <p className={styles.listTitle}>Latest Request</p>
          <div className={styles.moreRequests}>
            <p>See All</p>
            <Icon icon="ph:caret-double-right" width="20" height="20" />
          </div>
        </div>
        <div className={styles.listHeader}>
          <p className={styles.requestTitle}>Request Title</p>
          <p className={styles.requestName}>patient Name</p>
          <div className={styles.titleMiddle}>
            <p className={styles.requestPriority}>Priority</p>
            <p className={styles.requestStatus}>Status</p>
            <p className={styles.requestAction}>action</p>
          </div>
        </div>
        <div className={styles.listContent}>
          <div className={styles.listRecord}>
            <p className={styles.rowTitle}>request for dialisis</p>
            <p className={styles.rowName}>Marianne</p>
            <div className={styles.titleMiddle}>
              <div className={styles.rowPriority}>
                <Icon
                  icon="ph:dot-outline-fill"
                  width="25"
                  height="25"
                  color="rgb(189, 0, 0)"
                />
                <p>high</p>
              </div>
              <p className={styles.rowStatus}>pending</p>
              <p className={styles.rowAction}>action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
