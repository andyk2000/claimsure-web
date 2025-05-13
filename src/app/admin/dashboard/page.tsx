"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import DashboardChart from "@/components/DashboardChart";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeftSection}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          <p className={styles.pageSubtitle}>System overview and statistics</p>
        </div>
        <div className={styles.dateSelector}>
          <Icon icon="ph:calendar" width="20" height="20" />
          <span>Last 30 days</span>
          <Icon icon="ph:caret-down" width="16" height="16" />
        </div>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#e0f2fe" }}>
            <Icon icon="ph:users" width="24" height="24" color="#0284c7" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Total Users</h3>
            <p className={styles.statValue}>1,245</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#00be13" />
              <span>12% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#d1fae5" }}>
            <Icon icon="ph:hospital" width="24" height="24" color="#065f46" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Active Facilities</h3>
            <p className={styles.statValue}>87</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#00be13" />
              <span>5% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#e0e7ff" }}>
            <Icon icon="ph:file-text" width="24" height="24" color="#4f46e5" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Total Requests</h3>
            <p className={styles.statValue}>3,782</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#00be13" />
              <span>8% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#fee2e2" }}>
            <Icon icon="ph:clock-countdown" width="24" height="24" color="#b91c1c" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Pending Approvals</h3>
            <p className={styles.statValue}>42</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-down" width="16" height="16" color="#b91c1c" />
              <span>3% vs last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>System Activity</h2>
            <div className={styles.chartControls}>
              <select className={styles.chartSelect}>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <DashboardChart />
          </div>
        </div>
        
        <div className={styles.recentActivityCard}>
          <div className={styles.activityHeader}>
            <h2 className={styles.activityTitle}>Recent Activity</h2>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="ph:arrow-right" width="16" height="16" />
            </button>
          </div>
          
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#e0f2fe" }}>
                <Icon icon="ph:user-plus" width="16" height="16" color="#0284c7" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>New user registered: <strong>Dr. James Wilson</strong></p>
                <p className={styles.activityTime}>2 hours ago</p>
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#d1fae5" }}>
                <Icon icon="ph:hospital" width="16" height="16" color="#065f46" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>New facility added: <strong>Central Medical Center</strong></p>
                <p className={styles.activityTime}>5 hours ago</p>
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#fee2e2" }}>
                <Icon icon="ph:warning" width="16" height="16" color="#b91c1c" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>System alert: <strong>Database backup completed</strong></p>
                <p className={styles.activityTime}>Yesterday</p>
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#e0e7ff" }}>
                <Icon icon="ph:gear" width="16" height="16" color="#4f46e5" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>System update: <strong>Version 2.3.0 deployed</strong></p>
                <p className={styles.activityTime}>2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

