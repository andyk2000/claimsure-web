"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import { getPatientBasicInfo, getMedicalHistory, getMedicalRecordsByType, addMedicalRecord } from "./action";
import Swal from "sweetalert2";

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

interface NewRecordForm {
  type: string;
  title: string;
  provider: string;
  description: string;
  date: string;
}

export default function MedicalHistoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const patientId = parseInt(params.id);
  
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientBasicInfo | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [newRecord, setNewRecord] = useState<NewRecordForm>({
    type: "Visit",
    title: "",
    provider: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPatientAndMedicalHistory = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || "";
        
        // Fetch patient basic info
        const patientResult = await getPatientBasicInfo(patientId, token);
        
        if (!patientResult.success) {
          setError(patientResult.message || "Failed to fetch patient information");
          throw new Error(patientResult.message || "Failed to fetch patient information");
        }
        
        setPatient(patientResult.data);
        
        // Fetch medical history
        const historyResult = await getMedicalHistory(patientId, token);
        
        if (historyResult.success) {
          setMedicalRecords(historyResult.data || []);
        } else {
          console.error("Error fetching medical history:", historyResult.message);
          // Continue with empty records rather than failing completely
          setMedicalRecords([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An unexpected error occurred");
        
        // Fallback to mock data if in development
        if (process.env.NODE_ENV === 'development') {
          setPatient({
            id: patientId,
            name: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "Robert Wilson", "Jennifer Martinez"][patientId - 1] || `Patient ${patientId}`,
            age: 30 + patientId,
            gender: patientId % 2 === 0 ? "Female" : "Male",
          });
          
          // Create mock medical records
          const mockRecords: MedicalRecord[] = [];
          const currentDate = new Date();
          
          // Add a consultation
          mockRecords.push({
            id: 1,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15).toISOString().split('T')[0],
            type: "Visit",
            title: "Regular Checkup",
            provider: "Dr. Johnson",
            description: "Patient came in for regular checkup. Vitals normal. No significant concerns."
          });
          
          // Add a test result
          mockRecords.push({
            id: 2,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 5).toISOString().split('T')[0],
            type: "Lab Result",
            title: "Blood Work Results",
            provider: "City Lab",
            description: "Complete blood count and metabolic panel. All results within normal ranges."
          });
          
          // Add more mock records based on patient ID
          if (patientId % 2 === 0) {
            mockRecords.push({
              id: 3,
              date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 20).toISOString().split('T')[0],
              type: "Procedure",
              title: "Minor Surgery",
              provider: "Dr. Smith",
              description: "Minor outpatient procedure performed. Patient recovered well."
            });
          }
          
          if (patientId % 3 === 0) {
            mockRecords.push({
              id: 4,
              date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 4, 10).toISOString().split('T')[0],
              type: "Vaccination",
              title: "Flu Vaccine",
              provider: "Nurse Williams",
              description: "Annual flu vaccination administered. No adverse reactions."
            });
          }
          
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
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAndMedicalHistory();
  }, [patientId]);

  const handleBack = () => {
    router.push(`/eu/patients/${patientId}`);
  };

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab);
    
    if (tab !== "all") {
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getMedicalRecordsByType(patientId, tab, token);
        
        if (result.success) {
          setMedicalRecords(result.data || []);
        } else {
          console.error(`Error fetching ${tab} records:`, result.message);
          // Keep existing records if fetch fails
        }
      } catch (err) {
        console.error(`Error fetching ${tab} records:`, err);
        Swal.fire({
          title: "Error",
          text: `Failed to fetch ${tab} records. Please try again.`,
          icon: "error",
        });
      }
    } else {
      // If "All" tab is selected, fetch all records again
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getMedicalHistory(patientId, token);
        
        if (result.success) {
          setMedicalRecords(result.data || []);
        }
      } catch (err) {
        console.error("Error fetching all records:", err);
      }
    }
  };

  const handleAddRecord = () => {
    setShowAddRecordModal(true);
  };

  const handleCloseModal = () => {
    setShowAddRecordModal(false);
    // Reset form
    setNewRecord({
      type: "Visit",
      title: "",
      provider: "",
      description: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRecord.title || !newRecord.provider || !newRecord.description) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem("token") || "";
      
      const recordToAdd = {
        patientId,
        date: newRecord.date,
        type: newRecord.type,
        title: newRecord.title,
        provider: newRecord.provider,
        description: newRecord.description,
      };
      
      const result = await addMedicalRecord(recordToAdd, token);
      
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: "Medical record added successfully",
          icon: "success",
        });
        
        // Close modal and refresh records
        handleCloseModal();
        
        // Refresh the medical records list
        const historyResult = await getMedicalHistory(patientId, token);
        if (historyResult.success) {
          setMedicalRecords(historyResult.data || []);
        }
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Failed to add medical record",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error adding medical record:", err);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
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
          <button className={styles.addRecordButton} onClick={handleAddRecord}>
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
                      record.type.toLowerCase() === "visit" ? "ph:stethoscope" :
                      record.type.toLowerCase() === "lab result" ? "ph:flask" :
                      record.type.toLowerCase() === "procedure" ? "ph:bandaids" :
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

      {/* Add Record Modal */}
      {showAddRecordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add Medical Record</h3>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <Icon icon="ph:x" width="20" height="20" />
              </button>
            </div>
            <form onSubmit={handleSubmitRecord} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="type">Record Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={newRecord.type} 
                  onChange={handleInputChange}
                  className={styles.formSelect}
                >
                  <option value="Visit">Visit</option>
                  <option value="Lab Result">Lab Result</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Medication">Medication</option>
                  <option value="Vaccination">Vaccination</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={newRecord.date} 
                  onChange={handleInputChange}
                  className={styles.formInput}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={newRecord.title} 
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="e.g., Annual Checkup"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="provider">Provider</label>
                <input 
                  type="text" 
                  id="provider" 
                  name="provider" 
                  value={newRecord.provider} 
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="e.g., Dr. Smith"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newRecord.description} 
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Enter details about the medical record"
                  rows={4}
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className={styles.spinnerSmall}></div>
                      Saving...
                    </>
                  ) : (
                    "Save Record"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


