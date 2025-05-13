"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  insuranceId: string;
  lastVisit: string;
  medicalCondition: string;
  status: string;
}

export default function PatientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock patient data
  const patients: Patient[] = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      insuranceId: "INS-12345",
      lastVisit: "2023-10-15",
      medicalCondition: "Hypertension",
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      insuranceId: "INS-23456",
      lastVisit: "2023-11-02",
      medicalCondition: "Diabetes Type 2",
      status: "Active"
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      insuranceId: "INS-34567",
      lastVisit: "2023-09-28",
      medicalCondition: "Arthritis",
      status: "Active"
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 27,
      gender: "Female",
      insuranceId: "INS-45678",
      lastVisit: "2023-11-10",
      medicalCondition: "Asthma",
      status: "Active"
    },
    {
      id: 5,
      name: "Robert Wilson",
      age: 62,
      gender: "Male",
      insuranceId: "INS-56789",
      lastVisit: "2023-10-05",
      medicalCondition: "Coronary Heart Disease",
      status: "Inactive"
    },
    {
      id: 6,
      name: "Jennifer Martinez",
      age: 41,
      gender: "Female",
      insuranceId: "INS-67890",
      lastVisit: "2023-11-15",
      medicalCondition: "Migraine",
      status: "Active"
    }
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medicalCondition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insuranceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (id: number) => {
    router.push(`/medical-advisor/patients/${id}`);
  };

  const handleViewMedicalHistory = (id: number) => {
    router.push(`/medical-advisor/patients/${id}/medical-history`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>View and manage patient information</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Icon icon="ph:magnifying-glass" width="20" height="20" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterButton}>
            <Icon icon="ph:funnel" width="20" height="20" />
            <span>Filter</span>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.patientsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Insurance ID</th>
              <th>Last Visit</th>
              <th>Medical Condition</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.insuranceId}</td>
                <td>{new Date(patient.lastVisit).toLocaleDateString()}</td>
                <td>{patient.medicalCondition}</td>
                <td>
                  <span className={`${styles.statusBadge} ${patient.status === 'Active' ? styles.statusActive : styles.statusInactive}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleViewPatient(patient.id)}
                      title="View Patient Details"
                    >
                      <Icon icon="ph:user" width="18" height="18" />
                    </button>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleViewMedicalHistory(patient.id)}
                      title="View Medical History"
                    >
                      <Icon icon="ph:heartbeat" width="18" height="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}