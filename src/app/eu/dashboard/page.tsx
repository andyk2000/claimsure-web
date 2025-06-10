"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import Chart from "@/components/Chart";

export default function Dashboard() {
  const router = useRouter();
  
  const navigateNewRequest = () => {
    router.push("/eu/dashboard/Requests/new-request");
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <h1 className={styles.pageTitle}>Healthcare Provider Dashboard</h1>
          <p className={styles.pageSubtitle}>Request overview and statistics</p>
        </div>
        <button className={styles.newRequestButton} onClick={navigateNewRequest}>
          <Icon icon="ph:plus" width="20" height="20" />
          New Request
        </button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#dcfce7" }}>
            <Icon icon="ph:thumbs-up" width="24" height="24" color="#16a34a" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Approved Requests</h3>
            <p className={styles.statValue}>23</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#16a34a" />
              <span>8% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#fee2e2" }}>
            <Icon icon="ph:thumbs-down" width="24" height="24" color="#dc2626" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Denied Requests</h3>
            <p className={styles.statValue}>5</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-down" width="16" height="16" color="#16a34a" />
              <span>3% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#fef3c7" }}>
            <Icon icon="ph:clock" width="24" height="24" color="#d97706" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Pending Requests</h3>
            <p className={styles.statValue}>11</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#dc2626" />
              <span>12% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#e0e7ff" }}>
            <Icon icon="ph:clock-countdown" width="24" height="24" color="#4f46e5" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Avg. Response Time</h3>
            <p className={styles.statValue}>2.3 days</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-down" width="16" height="16" color="#16a34a" />
              <span>10% vs last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Monthly Approval Chart</h2>
            <div className={styles.chartControls}>
              <select className={styles.chartSelect}>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Chart />
          </div>
        </div>
        
        <div className={styles.recentActivityCard}>
          <div className={styles.activityHeader}>
            <h2 className={styles.activityTitle}>Recent Requests</h2>
            <button className={styles.viewAllButton} onClick={() => router.push("/eu/dashboard/Requests")}>
              View All
              <Icon icon="ph:arrow-right" width="16" height="16" />
            </button>
          </div>
          
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#dcfce7" }}>
                <Icon icon="ph:check-circle" width="20" height="20" color="#16a34a" />
              </div>
              <div className={styles.activityContent}>
                <h4 className={styles.activityTitle}>Medication Request Approved</h4>
                <p className={styles.activityTime}>Today, 10:30 AM</p>
              </div>
              <span className={styles.activityBadge} style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                Approved
              </span>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#fef3c7" }}>
                <Icon icon="ph:clock" width="20" height="20" color="#d97706" />
              </div>
              <div className={styles.activityContent}>
                <h4 className={styles.activityTitle}>Specialist Consultation Request</h4>
                <p className={styles.activityTime}>Yesterday, 2:15 PM</p>
              </div>
              <span className={styles.activityBadge} style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>
                Pending
              </span>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#fee2e2" }}>
                <Icon icon="ph:x-circle" width="20" height="20" color="#dc2626" />
              </div>
              <div className={styles.activityContent}>
                <h4 className={styles.activityTitle}>Imaging Request Denied</h4>
                <p className={styles.activityTime}>May 15, 9:45 AM</p>
              </div>
              <span className={styles.activityBadge} style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
                Denied
              </span>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#dcfce7" }}>
                <Icon icon="ph:check-circle" width="20" height="20" color="#16a34a" />
              </div>
              <div className={styles.activityContent}>
                <h4 className={styles.activityTitle}>Laboratory Tests Approved</h4>
                <p className={styles.activityTime}>May 12, 11:20 AM</p>
              </div>
              <span className={styles.activityBadge} style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                Approved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


