"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import styles from "./layout.module.css";

const pagePaths = {
  Dashboard: "/admin/dashboard",
  Users: "/admin/users",
  Settings: "/admin/settings",
  Facilities: "/admin/settings/facilities",
};

export default function AdminLayout({
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
            <p className={styles.profileName}>Admin User</p>
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
                [styles.menuItemActive]: currentPath === pagePaths.Users,
              })}
              href={pagePaths.Users}
            >
              <Icon icon="ph:users-duotone" fontSize={20} />
              <p>Users</p>
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
