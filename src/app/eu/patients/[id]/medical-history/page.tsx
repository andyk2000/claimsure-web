"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";

interface PatientBasicInfo {
  id: number;
  name: string;
  age: number;
  gender: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  title: string;
  provider: string;
  description: string;
  attachments?: string[];
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
      
      // Add some visits
      for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i * 2);
        mockRecords.push({
          id: i + 1,
          date: date.toISOString().split('T')[0],
          type: "Visit",
          title: `Regular Check-up ${i + 1}`,
          provider: "Dr. " + ["Johnson", "Smith", "Williams"][i % 3],
          description: `Routine examination. Patient reported ${i === 0 ? "no" : "minor"} issues. Vital signs normal.`
        });
      }
      
      // Add some lab results
      for (let i = 0; i < 2; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i - 1);
        mockRecords.push({
          id: i + 4,
          date: date.toISOString().split('T')[0],
          type: "Lab Result",
          title: `Blood Test ${i + 1}`,
          provider: "Central Medical Lab",
          description: "Complete blood count and metabolic panel. Results within normal range.",
          attachments: ["blood_test_results.pdf"]
        });
      }
      
      // Add a procedure
      const procDate = new Date();
      procDate.setMonth(procDate.getMonth() - 3);
      mockRecords.push({
        id: 6,
        date: procDate.toISOString().split('T')[0],
        type: "Procedure",
        title: "X-Ray Examination",
        provider: "Dr. Anderson",
        description: "Chest X-ray performed. No abnormalities detected.",
        attachments: ["xray_results.pdf", "xray_image.jpg"]
      });
      
      // Add a medication
      const medDate = new Date();
      medDate.setMonth(medDate.getMonth() - 1);
      mockRecords.push({
        id: 7,
        date: medDate.toISOString().split('T')[0],
        type: "Medication",
        title: "Prescription Renewal",
        provider: "Dr. Martinez",
        description: "Renewed prescription for maintenance medication. 30-day supply."
      });
      
      // Sort by date (newest first)
      mockRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setMedicalRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, [patientId]);

  const handleBack = () => {
    router.push(`/eu/patients/${patientId}`);
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
          className={`${styles.tabButton} ${activeTab === "all" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("all")}
        >
          All Records
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === "visit" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("visit")}
        >
          Visits
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === "lab result" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("lab result")}
        >
          Lab Results
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === "procedure" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("procedure")}
        >
          Procedures
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === "medication" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("medication")}
        >
          Medications
        </button>
      </div>

      <div className={styles.recordsContainer}>
        {filteredRecords.length === 0 ? (
          <div className={styles.noRecords}>
            <Icon icon="ph:file-x" width="48" height="48" color="#9ca3af" />
            <p>No records found</p>
          </div>
        ) : (
          filteredRecords.map(record => (
            <div key={record.id} className={styles.recordCard}>
              <div className={styles.recordHeader}>
                <div className={styles.recordType}>
                  <Icon 
                    icon={
                      record.type === "Visit" ? "ph:stethoscope" :
                      record.type === "Lab Result" ? "ph:flask" :
                      record.type === "Procedure" ? "ph:bandaids" :
                      "ph:pill"
                    } 
                    width="20" 
                    height="20" 
                  />
                  <span>{record.type}</span>
                </div>
                <span className={styles.recordDate}>{new Date(record.date).toLocaleDateString()}</span>
              </div>
              <h3 className={styles.recordTitle}>{record.title}</h3>
              <p className={styles.recordProvider}>{record.provider}</p>
              <p className={styles.recordDescription}>{record.description}</p>
              
              {record.attachments && record.attachments.length > 0 && (
                <div className={styles.attachments}>
                  <p className={styles.attachmentsTitle}>Attachments:</p>
                  <div className={styles.attachmentsList}>
                    {record.attachments.map((attachment, index) => (
                      <div key={index} className={styles.attachment}>
                        <Icon 
                          icon={attachment.endsWith('.pdf') ? "ph:file-pdf" : "ph:file-image"} 
                          width="16" 
                          height="16" 
                        />
                        <span>{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}