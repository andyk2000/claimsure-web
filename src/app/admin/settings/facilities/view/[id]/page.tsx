"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { getFacilityById } from "../../action";
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
}

export default function ViewFacility({ params }: { params: { id: string } }) {
  const router = useRouter();
  const facilityId = parseInt(params.id);

  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState<FacilityData | null>(null);

  useEffect(() => {
    const loadFacility = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getFacilityById(facilityId, token);

        if (result.success) {
          setFacility(result.data);
        } else {
          throw new Error(result.message || "Failed to load facility details");
        }
      } catch (error) {
        console.error("Error loading facility details:", error);
        Swal.fire({
          title: "Error",
          text:
            error instanceof Error
              ? error.message
              : "Failed to load facility details",
          icon: "error",
        }).then(() => {
          router.push("/admin/settings/facilities");
        });
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [facilityId, router]);

  const handleEdit = () => {
    router.push(`/admin/settings/facilities/edit/${facilityId}`);
  };

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
        <button className={styles.editButton} onClick={handleEdit}>
          <Icon icon="ph:pencil-simple" width="20" height="20" />
          Edit Facility
        </button>
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
            <h3 className={styles.detailLabel}>Location</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:map-pin" width="20" height="20" />
              <span>{facility.address}</span>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:buildings" width="20" height="20" />
              <span>
                {facility.city}, {facility.state} {facility.zipCode}
              </span>
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
                Last Updated:{" "}
                {new Date(facility.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

