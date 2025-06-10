"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import styles from "./layout.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { getUserName, getUserInstitution, refreshUserData, logout } from "@/utils/auth";

const pagePaths = {
  Dashboard: "/eu/dashboard",
  Patients: "/eu/patients",
  Settings: "/eu/settings",
};

export default function EULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname;
  const [userName, setUserName] = useState("Healthcare Provider");
  const [institution, setInstitution] = useState("@HealthFacility");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Try to get user data from localStorage first
      const name = getUserName();
      const userInstitution = getUserInstitution();
      
      if (name) {
        setUserName(name);
      }
      
      if (userInstitution) {
        setInstitution(`@${userInstitution}`);
      }
      
      // Refresh user data from server in the background
      await refreshUserData();
      
      // Update with fresh data if available
      const refreshedName = getUserName();
      const refreshedInstitution = getUserInstitution();
      
      if (refreshedName && refreshedName !== name) {
        setUserName(refreshedName);
      }
      
      if (refreshedInstitution && refreshedInstitution !== userInstitution) {
        setInstitution(`@${refreshedInstitution}`);
      }
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute allowedRoles={["doctor", "healthcare-provider", "end-user"]}>
      <div className={styles.pageContainer}>
        <div className={styles.sideBar}>
          <div className={styles.uperSectionSideBar}>
            <div className={styles.profileSection}>
              <Icon
                icon="ph:user-circle-thin"
                style={{ color: "#242e8f" }}
                fontSize={70}
              />
              {isLoading ? (
                <div className={styles.loadingProfile}>
                  <div className={styles.loadingBar}></div>
                  <div className={styles.loadingBar}></div>
                </div>
              ) : (
                <>
                  <p className={styles.profileName}>{userName}</p>
                  <p className={styles.profileInstitution}>{institution}</p>
                </>
              )}
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
            <div className={styles.logoutButton} onClick={handleLogout}>
              <Icon icon="ph:sign-out-duotone" fontSize={20} />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className={styles.mainContent}>
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}


