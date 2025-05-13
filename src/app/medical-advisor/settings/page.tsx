"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function MedicalAdvisorSettings() {
  const [categories] = useState<SettingsCategory[]>([
    {
      id: "profile",
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      icon: "ph:user-circle"
    },
    {
      id: "notifications",
      title: "Notification Preferences",
      description: "Manage how and when you receive notifications",
      icon: "ph:bell"
    },
    {
      id: "security",
      title: "Security Settings",
      description: "Update password and security preferences",
      icon: "ph:shield"
    },
    {
      id: "approvals",
      title: "Approval Workflow",
      description: "Configure request approval workflow settings",
      icon: "ph:check-circle"
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account and preferences</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.categoryIcon}>
              <Icon icon={category.icon} width="24" height="24" />
            </div>
            <div className={styles.categoryContent}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
            <Icon icon="ph:caret-right" className={styles.categoryArrow} width="20" height="20" />
          </div>
        ))}
      </div>
    </div>
  );
}