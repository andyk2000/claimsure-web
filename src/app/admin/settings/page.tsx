"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import styles from "./page.module.css";

interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export default function AdminSettings() {
  const [categories] = useState<SettingsCategory[]>([
    {
      id: "facilities",
      title: "Facilities Management",
      description: "Manage healthcare facilities, clinics, and hospitals",
      icon: "ph:hospital",
      path: "/admin/settings/facilities"
    },
    {
      id: "users",
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: "ph:users-three",
      path: "/admin/users"
    },
    {
      id: "system",
      title: "System Configuration",
      description: "Configure system-wide settings and preferences",
      icon: "ph:gear-six",
      path: "/admin/settings/system"
    },
    {
      id: "security",
      title: "Security Settings",
      description: "Manage security policies and access controls",
      icon: "ph:shield",
      path: "/admin/settings/security"
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Settings</h1>
        <p className={styles.subtitle}>Manage system settings and configurations</p>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link href={category.path} key={category.id} className={styles.categoryCard}>
            <div className={styles.categoryIcon}>
              <Icon icon={category.icon} width="24" height="24" />
            </div>
            <div className={styles.categoryContent}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
            <Icon icon="ph:caret-right" className={styles.categoryArrow} width="20" height="20" />
          </Link>
        ))}
      </div>
    </div>
  );
}