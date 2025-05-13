"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import DashboardChart from "@/components/DashboardChart";

export default function MedicalAdvisorDashboard() {
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
          <h1 className={styles.pageTitle}>Medical Advisor Dashboard</h1>
          <p className={styles.pageSubtitle}>Request overview and statistics</p>
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
            <Icon icon="ph:file-text" width="24" height="24" color="#0284c7" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Pending Requests</h3>
            <p className={styles.statValue}>42</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#b91c1c" />
              <span>8% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#d1fae5" }}>
            <Icon icon="ph:check-circle" width="24" height="24" color="#065f46" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Approved Requests</h3>
            <p className={styles.statValue}>187</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-up" width="16" height="16" color="#00be13" />
              <span>12% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#fee2e2" }}>
            <Icon icon="ph:x-circle" width="24" height="24" color="#b91c1c" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Rejected Requests</h3>
            <p className={styles.statValue}>23</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-down" width="16" height="16" color="#00be13" />
              <span>5% vs last month</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconContainer} style={{ backgroundColor: "#e0e7ff" }}>
            <Icon icon="ph:clock-countdown" width="24" height="24" color="#4f46e5" />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Avg. Response Time</h3>
            <p className={styles.statValue}>1.8 days</p>
            <div className={styles.statTrend}>
              <Icon icon="ph:arrow-down" width="16" height="16" color="#00be13" />
              <span>10% vs last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Request Activity</h2>
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
            <h2 className={styles.activityTitle}>Recent Requests</h2>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="ph:arrow-right" width="16" height="16" />
            </button>
          </div>
          
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#fee2e2" }}>
                <Icon icon="ph:clock" width="16" height="16" color="#b91c1c" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}><strong>Dialysis Treatment</strong> - Dr. James Wilson</p>
                <p className={styles.activityTime}>2 hours ago</p>
              </div>
              <div className={styles.activityBadge} style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                Pending
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#d1fae5" }}>
                <Icon icon="ph:check" width="16" height="16" color="#065f46" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}><strong>MRI Scan</strong> - Dr. Sarah Johnson</p>
                <p className={styles.activityTime}>5 hours ago</p>
              </div>
              <div className={styles.activityBadge} style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                Approved
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#fee2e2" }}>
                <Icon icon="ph:x" width="16" height="16" color="#b91c1c" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}><strong>Specialized Medication</strong> - Dr. Michael Brown</p>
                <p className={styles.activityTime}>Yesterday</p>
              </div>
              <div className={styles.activityBadge} style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
                Rejected
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ backgroundColor: "#d1fae5" }}>
                <Icon icon="ph:check" width="16" height="16" color="#065f46" />
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}><strong>Physical Therapy</strong> - Dr. Emily Davis</p>
                <p className={styles.activityTime}>2 days ago</p>
              </div>
              <div className={styles.activityBadge} style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
                Approved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}