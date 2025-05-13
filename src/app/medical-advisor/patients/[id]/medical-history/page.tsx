"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  provider: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface PatientBasicInfo {
  id: number;
  name: string;
  age: number;
  gender: string;
}

export default function MedicalHistoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const patientId = parseInt(params.id);
  
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientBasicInfo | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // Simulate API call to get patient details and medical history
    setTimeout(() => {
      setPatient({
        id: patientId,
        name: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "Robert Wilson", "Jennifer Martinez"][patientId - 1] || `Patient ${patientId}`,
        age: 30 + patientId,
        gender: patientId % 2 === 0 ? "Female" : "Male",
      });
      
      // Generate mock medical records
      const mockRecords: MedicalRecord[] = [];
      const recordTypes = ["Consultation", "Procedure", "Lab Test", "Imaging", "Surgery", "Follow-up"];
      const providers = ["Dr. James Wilson", "Dr. Lisa Chen", "Dr. Robert Johnson", "Dr. Emily Taylor", "Dr. Michael Davis"];
      
      // Generate between 5-10 records
      const numRecords = 5 + (patientId % 6);
      
      for (let i = 1; i <= numRecords; i++) {
        // Create date within last 2 years
        const date = new Date();
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 24));
        
        mockRecords.push({
          id: i,
          date: date.toISOString().split('T')[0],
          type: recordTypes[i % recordTypes.length],
          provider: providers[i % providers.length],
          diagnosis: i % 3 === 0 ? "Hypertension" : i % 2 === 0 ? "Upper Respiratory Infection" : "Annual Check-up",
          treatment: i % 3 === 0 ? "Prescribed Lisinopril 10mg" : i % 2 === 0 ? "Prescribed antibiotics" : "No treatment required",
          notes: `Patient visit notes for record #${i}. Follow-up in ${i % 3 + 1} months.`
        });
      }
      
      // Sort by date (newest first)
      mockRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setMedicalRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, [patientId]);

  const handleBack = () => {
    router.push(`/medical-advisor/patients/${patientId}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredRecords = activeTab === "all" 
    ? medicalRecords 
    : medicalRecords.filter(record => record.type.toLowerCase() === activeTab.toLowerCase());

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading medical history...</p>
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
          <div>
            <h2 className={styles.pageTitle}>Medical History</h2>
            <p className={styles.patientInfo}>
              {patient.name} • {patient.age} years • {patient.gender}
            </p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addRecordButton}>
            <Icon icon="ph:plus" width="20" height="20" />
            Add Record
          </button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All Records
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'consultation' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('consultation')}
        >
          Consultations
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'procedure' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('procedure')}
        >
          Procedures
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'lab test' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('lab test')}
        >
          Lab Tests
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'imaging' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('imaging')}
        >
          Imaging
        </button>
      </div>

      <div className={styles.recordsContainer}>
        {filteredRecords.length === 0 ? (
          <div className={styles.noRecords}>
            <Icon icon="ph:file-x" width="48" height="48" color="#9ca3af" />
            <p>No medical records found for the selected category.</p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <div key={record.id} className={styles.recordCard}>
              <div className={styles.recordHeader}>
                <div className={styles.recordType}>
                  <Icon 
                    icon={
                      record.type === "Consultation" ? "ph:stethoscope" :
                      record.type === "Procedure" ? "ph:bandaids" :
                      record.type === "Lab Test" ? "ph:flask" :
                      record.type === "Imaging" ? "ph:x-ray" :
                      record.type === "Surgery" ? "ph:scalpel" :
                      "ph:clipboard-text"
                    } 
                    width="24" 
                    height="24" 
                    color="#242e8f" 
                  />
                  <span>{record.type}</span>
                </div>
                <div className={styles.recordDate}>
                  <Icon icon="ph:calendar" width="16" height="16" />
                  <span>{new Date(record.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className={styles.recordDetails}>
                <div className={styles.recordField}>
                  <span className={styles.fieldLabel}>Provider:</span>
                  <span className={styles.fieldValue}>{record.provider}</span>
                </div>
                <div className={styles.recordField}>
                  <span className={styles.fieldLabel}>Diagnosis:</span>
                  <span className={styles.fieldValue}>{record.diagnosis}</span>
                </div>
                <div className={styles.recordField}>
                  <span className={styles.fieldLabel}>Treatment:</span>
                  <span className={styles.fieldValue}>{record.treatment}</span>
                </div>
                <div className={styles.recordField}>
                  <span className={styles.fieldLabel}>Notes:</span>
                  <span className={styles.fieldValue}>{record.notes}</span>
                </div>
              </div>
              
              <div className={styles.recordActions}>
                <button className={styles.actionButton} title="View Details">
                  <Icon icon="ph:eye" width="18" height="18" />
                </button>
                <button className={styles.actionButton} title="Edit Record">
                  <Icon icon="ph:pencil-simple" width="18" height="18" />
                </button>
                <button className={styles.actionButton} title="Print Record">
                  <Icon icon="ph:printer" width="18" height="18" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
