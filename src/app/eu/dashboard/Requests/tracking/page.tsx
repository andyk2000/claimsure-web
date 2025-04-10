"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRequestData } from "./action";

interface RequestType {
  id: number;
  title: string;
  priority: string;
  patientId: number;
  patientName: string;
  status: string;
}

// const priorityRange = [
//   {
//     id: 1,
//     color: "rgb(3, 185, 58)",
//   },
//   {
//     id: 2,
//     color: "rgb(231, 227, 1)",
//   },
//   {
//     id: 3,
//     color: "rgb(189, 0, 0)",
//   },
// ];

export default function Tracking() {
  const [requestData, setRequestData] = useState<RequestType>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getInitialData = async () => {
      const token = localStorage.getItem("token") || "";
      const idString = searchParams.get("id");
      if (idString) {
        const results = await getRequestData(idString, token);
        if (results.data && results.success) {
          setRequestData({
            id: results.data.name,
            title: results.data.title,
            patientId: results.data.patientId,
            patientName: results.data.patientName,
            priority: results.data.priority,
            status: results.data.status,
          });
        }
      }
    };

    getInitialData();
    console.log(requestData);
  }, []);
  
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
        <h2 className={styles.pageTitle}>Request Status</h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          width="25"
          height="25"
          className={styles.moreButton}
          color="#242e8f"
        />
      </div>
      <div className={styles.pageBody}>
        <div className={styles.statusTitle}>Under Review by medical advisor</div>
        <div className={styles.bodySection}>
          <div className={styles.progressbarContainer}>
            <div className={styles.progressBar}></div>
            <div className={styles.iconContainerDone}>
              <Icon
                icon="ph:paper-plane-tilt-fill"
                width="25"
                height="25"
                className={styles.sentIcon}
                color="white"
              />
            </div>
            <div className={styles.iconContainerActive}>
              <Icon
                icon="ph:clock-clockwise-fill"
                width="25"
                height="25"
                className={styles.sentIcon}
                color="#5a6acf"
              />
            </div>
            <div className={styles.iconContainerInactive}>
              <Icon
                icon="ph:check-bold"
                width="25"
                height="25"
                className={styles.sentIcon}
                color="rgba(0, 0, 0, 0.4)"
              />
            </div>
            <div className={styles.iconContainerInactive}>
              <Icon
                icon="ph:file-magnifying-glass"
                width="30"
                height="30"
                className={styles.sentIcon}
                color="rgba(0, 0, 0, 0.4)"
              />
            </div>
            <div className={styles.iconContainerInactive}>
              <Icon
                icon="ph:check-bold"
                width="25"
                height="25"
                className={styles.sentIcon}
                color="rgba(0, 0, 0, 0.4)"
              />
            </div>
          </div>
          <div className={styles.progressInfoContainer}>
            <div className={styles.requestTitle}>
              <p className={styles.requestTileLabel}>Title</p>
              <p className={styles.requestTitleData}>
                Dialisis for failing kidneys
              </p>
            </div>
            <div className={styles.requestPatientID}>
              <p className={styles.requestPatientIDLabel}>
                Patient Insurance ID
              </p>
              <p className={styles.requestPatientIDData}>#1234567</p>
            </div>
            <div className={styles.requestPriority}>
              <p className={styles.requestPriorityLabel}>Priority</p>
              <div className={styles.requestPriorityDataContainer}>
                <div className={styles.requestPriorityData}>
                  <Icon
                    icon="ph:dot-outline-fill"
                    width="35"
                    height="35"
                    color="rgb(189, 0, 0)"
                  />
                  <p>High</p>
                </div>
              </div>
            </div>
            <div className={styles.requestType}>
              <p className={styles.requestTypeLabel}>Type</p>
              <p className={styles.requestTypeData}>
                Extrat care specialized services
              </p>
            </div>
            <div className={styles.requestTime}>
              <p className={styles.requestTimeLabel}>Time Stamp</p>
              <p className={styles.requestTimeeData}>19/01/2025 10:27 am </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
