"use client";

import styles from "./page.module.css";
import { Icon } from "@iconify/react";
// import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { useState, useEffect } from "react";

const pagePaths = {
  Dashboard: "/eu/dashboard",
  Chat: "/eu/chat",
  Invoices: "/eu/invoices",
  Settings: "/eu/settings",
  Help: "/eu/help",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const handleClick = (path: string) => {
    localStorage.removeItem("Authorization");
    setCurrentPath(path);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sideBar}>
        <div className={styles.profileSection}>
          <Icon
            icon="ph:user-circle-thin"
            style={{ color: "#242e8f" }}
            fontSize={70}
          />
          <p className={styles.profileName}>Dr Bayingana JMV</p>
          <p className={styles.profileInstitution}>@Pharmacare</p>
        </div>
        <div className={styles.menuSection}>
          <Link
            className={clsx(styles.menuItem, {
              [styles.menuItemActive]: currentPath === pagePaths.Dashboard,
            })}
            href={pagePaths.Dashboard}
            onClick={() => handleClick(pagePaths.Dashboard)}
          >
            <Icon icon="uis:chart" width="30" height="30" />
            <p className={styles.menuItemLabel}>Dashboard</p>
          </Link>
          <Link
            className={clsx(styles.menuItem, {
              [styles.menuItemActive]: currentPath === pagePaths.Chat,
            })}
            href={pagePaths.Chat}
            onClick={() => handleClick(pagePaths.Chat)}
          >
            <Icon icon="bi:chat-dots-fill" width="30" height="30" />
            <p className={styles.menuItemLabel}>Chat</p>
          </Link>
          <Link
            className={clsx(styles.menuItem, {
              [styles.menuItemActive]: currentPath === pagePaths.Invoices,
            })}
            href={pagePaths.Invoices}
            onClick={() => handleClick(pagePaths.Invoices)}
          >
            <Icon icon="mingcute:wallet-fill" width="30" height="30" />
            <p className={styles.menuItemLabel}>Invoices</p>
          </Link>
          <Link
            className={clsx(styles.menuItem, {
              [styles.menuItemActive]: currentPath === pagePaths.Settings,
            })}
            href={pagePaths.Settings}
            onClick={() => handleClick(pagePaths.Settings)}
          >
            <Icon icon="tdesign:setting-1-filled" width="30" height="30" />
            <p className={styles.menuItemLabel}>Settings</p>
          </Link>
          <Link
            className={clsx(styles.menuItem, {
              [styles.menuItemActive]: currentPath === pagePaths.Help,
            })}
            href={pagePaths.Help}
            onClick={() => handleClick(pagePaths.Help)}
          >
            <Icon icon="basil:info-rect-solid" width="30" height="30" />
            <p className={styles.menuItemLabel}>Help</p>
          </Link>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
