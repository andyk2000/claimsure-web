"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import styles from "./page.module.css";

interface FacilityData {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  type: string;
  licenseNumber: string;
  taxId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  doctorsCount: number;
  requestsCount: number;
}

export default function FacilityDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const facilityId = parseInt(params.id);
  
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState<FacilityData | null>(null);

  useEffect(() => {
    // Simulate API call to get facility details
    // In a real application, you would fetch this data from your API
    setTimeout(() => {
      setFacility({
        id: facilityId,
        name: `General Hospital ${facilityId}`,
        address: "123 Medical Drive",
        city: "Healthcare City",
        state: "Medical State",
        zipCode: "12345",
        phone: "(555) 123-4567",
        email: `hospital${facilityId}@example.com`,
        type: "General Hospital",
        licenseNumber: `LIC-${facilityId}${facilityId}${facilityId}`,
        taxId: `TAX-${facilityId}${facilityId}${facilityId}`,
        status: "Active",
        createdAt: "2023-01-15T00:00:00Z",
        updatedAt: "2023-06-20T00:00:00Z",
        doctorsCount: 20 + facilityId,
        requestsCount: 45 + (facilityId * 3)
      });
      setLoading(false);
    }, 1000);
  }, [facilityId]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading facility details...</p>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className={styles.errorContainer}>
        <Icon icon="ph:warning" width="48" height="48" color="#ef4444" />
        <h2>Facility Not Found</h2>
        <p>The requested facility could not be found.</p>
        <button className={styles.backButton} onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon
            icon="ph:arrow-left-bold"
            width="25"
            height="25"
            className={styles.backIcon}
            color="#242e8f"
            onClick={handleBack}
          />
          <h2 className={styles.pageTitle}>Facility Details</h2>
        </div>
      </div>

      <div className={styles.facilityCard}>
        <div className={styles.facilityHeader}>
          <div>
            <h1 className={styles.facilityName}>{facility.name}</h1>
            <div className={styles.facilityType}>{facility.type}</div>
          </div>
          <div
            className={
              facility.status === "Active"
                ? styles.statusActive
                : styles.statusInactive
            }
          >
            {facility.status}
          </div>
        </div>

        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Icon icon="ph:user-circle" width="24" height="24" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Doctors</span>
              <span className={styles.statValue}>{facility.doctorsCount}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Icon icon="ph:file-text" width="24" height="24" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Requests</span>
              <span className={styles.statValue}>{facility.requestsCount}</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailGroup}>
            <h3 className={styles.detailLabel}>Contact Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:phone" width="20" height="20" />
              <span>{facility.phone}</span>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:envelope" width="20" height="20" />
              <span>{facility.email}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3 className={styles.detailLabel}>Address</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:map-pin" width="20" height="20" />
              <span>{facility.address}</span>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:buildings" width="20" height="20" />
              <span>{facility.city}, {facility.state} {facility.zipCode}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3 className={styles.detailLabel}>Legal Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:identification-card" width="20" height="20" />
              <span>License: {facility.licenseNumber}</span>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:file-text" width="20" height="20" />
              <span>Tax ID: {facility.taxId}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <h3 className={styles.detailLabel}>System Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:clock-clockwise" width="20" height="20" />
              <span>
                Created: {new Date(facility.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:clock-counter-clockwise" width="20" height="20" />
              <span>
                Last Updated: {new Date(facility.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}