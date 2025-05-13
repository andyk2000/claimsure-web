"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import styles from "./layout.module.css";

const pagePaths = {
  Dashboard: "/medical-advisor/dashboard",
  Requests: "/medical-advisor/requests",
  Facilities: "/medical-advisor/facilities",
  Patients: "/medical-advisor/patients",
  Settings: "/medical-advisor/settings",
};

export default function MedicalAdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sideBar}>
        <div className={styles.uperSectionSideBar}>
          <div className={styles.profileSection}>
            <Icon
              icon="ph:user-circle-thin"
              style={{ color: "#242e8f" }}
              fontSize={70}
            />
            <p className={styles.profileName}>Medical Advisor</p>
            <p className={styles.profileInstitution}>@HealthSystem</p>
          </div>
          <div className={styles.menuSection}>
            <Link
              className={clsx(styles.menuItem, {
                [styles.menuItemActive]: currentPath === pagePaths.Dashboard,
              })}
              href={pagePaths.Dashboard}
            >
              <Icon icon="ph:layout-duotone" fontSize={20} />
              <p>Dashboard</p>
            </Link>
            <Link
              className={clsx(styles.menuItem, {
                [styles.menuItemActive]: currentPath.includes(pagePaths.Requests),
              })}
              href={pagePaths.Requests}
            >
              <Icon icon="ph:file-text-duotone" fontSize={20} />
              <p>Requests</p>
            </Link>
            <Link
              className={clsx(styles.menuItem, {
                [styles.menuItemActive]: currentPath.includes(pagePaths.Facilities),
              })}
              href={pagePaths.Facilities}
            >
              <Icon icon="ph:hospital-duotone" fontSize={20} />
              <p>Medical Facilities</p>
            </Link>
            <Link
              className={clsx(styles.menuItem, {
                [styles.menuItemActive]: currentPath.includes(pagePaths.Patients),
              })}
              href={pagePaths.Patients}
            >
              <Icon icon="ph:user-list-duotone" fontSize={20} />
              <p>Patients</p>
            </Link>
            <Link
              className={clsx(styles.menuItem, {
                [styles.menuItemActive]: currentPath.includes(pagePaths.Settings),
              })}
              href={pagePaths.Settings}
            >
              <Icon icon="ph:gear-six-duotone" fontSize={20} />
              <p>Settings</p>
            </Link>
          </div>
        </div>
        <div className={styles.lowerSectionSideBar}>
          <div className={styles.logoutButton}>
            <Icon icon="ph:sign-out-duotone" fontSize={20} />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}



