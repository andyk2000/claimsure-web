"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Response() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Icon
          icon="ph:arrow-left-bold"
          width="25"
          height="25"
          className={styles.backButton}
          color="#242e8f"
        />
        <h2 className={styles.pageTitle}>Request Pending approval</h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          width="25"
          height="25"
          className={styles.moreButton}
          color="#242e8f"
        />
      </div>
      <div className={styles.pageRequestDataSection}>
        <div className={styles.pageRequestDataTitle}>
          <h3>Title:</h3>
          <div className={styles.titleContainer}>
            <p className={styles.pageRequestDataTitleText}>Head CT scan</p>
            <div className={styles.timeStampContainer}>
              <Icon icon="ph:clock-clockwise-duotone" width="20" height="20" />
              <p>2021-01-01</p>
            </div>
          </div>
        </div>
        <div className={styles.pageRequestPriority}>
          <h3>Request Priority:</h3>
          <div className={styles.priorityLow}>
            <Icon icon="ph:dot-outline-fill" width="20" height="20" />
            <p>Low</p>
          </div>
        </div>
        <div className={styles.pageRequestPatient}>
          <h3>Patient:</h3>
          <p>John Doe</p>
        </div>
        <div className={styles.pageRequestDoctor}>
          <h3>Requester:</h3>
          <p>Dr. Jane Doe</p>
        </div>
        <div className={styles.pageRequestType}>
          <h3>Request Type:</h3>
          <p>Head CT scan</p>
        </div>
        <div className={styles.pageRequestStatus}>
          <h3>Status:</h3>
          <p>Pending</p>
        </div>
        <div className={styles.pageRequestDescription}>
          <h3>Description:</h3>
          <textarea
            className={styles.requestDescription}
            placeholder="No Description provided..."
            disabled
          ></textarea>
        </div>
        <div className={styles.pageRequestAttachments}>
          <h3>Attachments</h3>
          <p>None</p>
        </div>
      </div>
      <div className={styles.pageResponseSection}>
        <div className={styles.pageResponseAction}>
          <button className={styles.approveButton}>
            <Icon icon="ph:check-bold" width="20" height="20" />
            <p>Approve</p>
          </button>
          <button className={styles.rejectButton}>
            <Icon icon="ph:x-bold" width="20" height="20" />
            <p>Reject</p>
          </button>
          <button className={styles.forwardButton}>
            <Icon icon="ph:arrows-clockwise-bold" width="20" height="20" />
            <p>Change</p>
          </button>
        </div>
      </div>
    </div>
  );
}
