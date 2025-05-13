"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

interface PatientData {
  id: number;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  bloodType: string;
  insuranceId: string;
  contactNumber: string;
  email: string;
  address: string;
  allergies: string[];
  currentMedications: string[];
  status: string;
}

export default function PatientDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const patientId = parseInt(params.id);
  
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientData | null>(null);

  useEffect(() => {
    // Simulate API call to get patient details
    setTimeout(() => {
      setPatient({
        id: patientId,
        name: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "Robert Wilson", "Jennifer Martinez"][patientId - 1] || `Patient ${patientId}`,
        age: 30 + patientId,
        gender: patientId % 2 === 0 ? "Female" : "Male",
        dateOfBirth: `${1970 + patientId}-05-15`,
        bloodType: ["A+", "B-", "O+", "AB+", "A-", "O-"][patientId - 1] || "Unknown",
        insuranceId: `INS-${10000 + patientId}`,
        contactNumber: `(555) ${100 + patientId}-${1000 + patientId}`,
        email: `patient${patientId}@example.com`,
        address: `${100 + patientId} Health Street, Medical City`,
        allergies: patientId % 3 === 0 ? ["Penicillin", "Peanuts"] : patientId % 2 === 0 ? ["Latex", "Shellfish"] : ["None"],
        currentMedications: patientId % 2 === 0 ? ["Lisinopril", "Metformin"] : ["Atorvastatin", "Levothyroxine"],
        status: patientId === 5 ? "Inactive" : "Active"
      });
      setLoading(false);
    }, 1000);
  }, [patientId]);

  const handleBack = () => {
    router.back();
  };

  const handleViewMedicalHistory = () => {
    router.push(`/medical-advisor/patients/${patientId}/medical-history`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading patient details...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className={styles.errorContainer}>
        <Icon icon="ph:warning" width="48" height="48" color="#ef4444" />
        <h2>Patient Not Found</h2>
        <p>The requested patient could not be found.</p>
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
          <h2 className={styles.pageTitle}>Patient Details</h2>
        </div>
        <button className={styles.historyButton} onClick={handleViewMedicalHistory}>
          <Icon icon="ph:heartbeat" width="20" height="20" />
          View Medical History
        </button>
      </div>

      <div className={styles.patientCard}>
        <div className={styles.patientHeader}>
          <div className={styles.patientInfo}>
            <h1 className={styles.patientName}>{patient.name}</h1>
            <div className={styles.patientBasicInfo}>
              <span>{patient.age} years</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>{patient.bloodType}</span>
            </div>
          </div>
          <div className={styles.patientStatus}>
            <span className={patient.status === "Active" ? styles.statusActive : styles.statusInactive}>
              {patient.status}
            </span>
          </div>
        </div>

        <div className={styles.patientDetailsGrid}>
          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:calendar" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Date of Birth</span>
                <span className={styles.detailValue}>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:identification-card" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Insurance ID</span>
                <span className={styles.detailValue}>{patient.insuranceId}</span>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:phone" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>{patient.contactNumber}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:envelope" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{patient.email}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:map-pin" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Address</span>
                <span className={styles.detailValue}>{patient.address}</span>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h3 className={styles.sectionTitle}>Medical Information</h3>
            <div className={styles.detailItem}>
              <Icon icon="ph:warning-circle" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Allergies</span>
                <div className={styles.tagsList}>
                  {patient.allergies.map((allergy, index) => (
                    <span key={index} className={styles.tag}>{allergy}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon="ph:pill" width="20" height="20" />
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Current Medications</span>
                <div className={styles.tagsList}>
                  {patient.currentMedications.map((medication, index) => (
                    <span key={index} className={styles.tag}>{medication}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




