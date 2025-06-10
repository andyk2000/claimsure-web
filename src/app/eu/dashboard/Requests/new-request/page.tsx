"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { createrequest, getPatient } from "./action";
import Swal from "sweetalert2";
import Link from "next/link";

interface Request {
  id: number;
  doctorId: number;
  medicalFacilityId: number;
  title: string;
  description: string;
  resources: string;
  status: number;
  date: string;
  typeofRequest: string;
  priority: string;
  attachments?: string[];
  patientId: number;
}

interface Patient {
  patientIdentification: any;
  id: number;
  names: string;
  age: number;
  sex: string;
}

export default function NewRequest() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [patient, setPatient] = useState<Patient>({
    id: 0,
    age: 0,
    names: "",
    sex: "",
    patientIdentification: 0,
  });
  
  const [request] = useState({
    id: 0,
    doctorId: 0,
    medicalFacilityId: 0,
    title: "",
    description: "",
    resources: "",
    status: 1,
    date: new Date().toISOString().split('T')[0],
    typeofRequest: "",
    priority: "",
    patientId: 0,
    attachments: [],
  });

  const patientValidationSchema = Yup.object({
    id: Yup.number()
      .min(1, "Patient ID must be a positive number")
      .required("Patient ID is required")
  });

  const requestValidationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters"),
    typeofRequest: Yup.string()
      .required("Request type is required"),
    priority: Yup.string()
      .required("Priority level is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newAttachments = Array.from(files);
    setAttachments([...attachments, ...newAttachments]);
    
    // Create preview URLs
    const newPreviews = newAttachments.map(file => URL.createObjectURL(file));
    setPreview([...preview, ...newPreviews]);
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = [...attachments];
    const updatedPreviews = [...preview];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedAttachments.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setAttachments(updatedAttachments);
    setPreview(updatedPreviews);
  };

  const checkPatient = async (values: { id: number }, { setSubmitting }: any) => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";
    
    try {
      const result = await getPatient(values.id, token);
      
      if (!result.success) {
        Swal.fire({
          title: "Patient Not Found",
          text: "Please verify the patient ID and try again.",
          icon: "error",
        });
      } else {
        setPatient(result.data.patient);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch patient information. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const submitRequest = async (values: Request, { setSubmitting }: any) => {
    if (!patient.id) {
      Swal.fire({
        title: "Missing Patient",
        text: "Please search for a patient before submitting the request.",
        icon: "warning",
      });
      setSubmitting(false);
      return;
    }
    
    setIsLoading(true);
    const token = localStorage.getItem("token") || "";
    
    // Get current user info from localStorage if available
    const userInfo = localStorage.getItem("userInfo");
    const doctorId = userInfo ? JSON.parse(userInfo).id : 1;
    
    const updatedRequest = {
      ...values,
      patientId: patient.patientIdentification,
      doctorId: doctorId,
      medicalFacilityId: 6, // This should ideally come from user context
      status: 1,
      attachments: preview,
    };
    
    try {
      const result = await createrequest(updatedRequest, token);
      
      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Your request has been submitted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/eu/dashboard/Requests");
        });
      } else {
        Swal.fire({
          title: "Submission Failed",
          text: result.message || "Failed to submit request. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      preview.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Link href="/eu/dashboard/Requests" className={styles.backLink}>
          <Icon
            icon="ph:arrow-left-bold"
            width="25"
            height="25"
            className={styles.backButton}
            color="#242e8f"
          />
        </Link>
        <h2 className={styles.pageTitle}>New Medical Request</h2>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.patientContainer}>
          <h3 className={styles.sectionTitle}>Patient Information</h3>
          
          <Formik
            initialValues={{ id: 0 }}
            validationSchema={patientValidationSchema}
            onSubmit={checkPatient}
          >
            {({ isSubmitting }) => (
              <Form className={styles.patientForm}>
                <div className={styles.patientIdSection}>
                  <div className={styles.formGroup}>
                    <label htmlFor="id" className={styles.inputLabel}>Patient ID</label>
                    <div className={styles.inputWithButton}>
                      <Field
                        type="text"
                        id="id"
                        name="id"
                        placeholder="Enter patient ID"
                        className={styles.inputField}
                      />
                      <button 
                        type="submit" 
                        className={styles.searchButton}
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading ? (
                          <Icon icon="ph:spinner-gap" className={styles.spinner} />
                        ) : (
                          <Icon icon="ph:magnifying-glass" />
                        )}
                        Search
                      </button>
                    </div>
                    <ErrorMessage name="id" component="div" className={styles.errorMessage} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          
          {patient.id > 0 && (
            <div className={styles.patientDetails}>
              <div className={styles.patientCard}>
                <div className={styles.patientInfo}>
                  <h4 className={styles.patientName}>{patient.names}</h4>
                  <div className={styles.patientMeta}>
                    <span className={styles.patientMetaItem}>
                      <Icon icon="ph:identification-card" />
                      ID: {patient.patientIdentification}
                    </span>
                    <span className={styles.patientMetaItem}>
                      <Icon icon="ph:user" />
                      Age: {patient.age}
                    </span>
                    <span className={styles.patientMetaItem}>
                      <Icon icon={patient.sex.toLowerCase() === "male" ? "ph:gender-male" : "ph:gender-female"} />
                      {patient.sex}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.requestContainer}>
          <h3 className={styles.sectionTitle}>Request Details</h3>
          
          <Formik
            initialValues={request}
            validationSchema={requestValidationSchema}
            onSubmit={submitRequest}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className={styles.requestForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.inputLabel}>Request Title</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title"
                    className={styles.inputField}
                  />
                  <ErrorMessage name="title" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="typeofRequest" className={styles.inputLabel}>Request Type</label>
                    <Field
                      as="select"
                      id="typeofRequest"
                      name="typeofRequest"
                      className={styles.selectField}
                    >
                      <option value="">Select request type</option>
                      <option value="medication">Medication Prescription</option>
                      <option value="imaging">Imaging (X-ray, MRI, CT)</option>
                      <option value="lab">Laboratory Tests</option>
                      <option value="therapy">Physical Therapy</option>
                      <option value="specialist">Specialist Consultation</option>
                      <option value="procedure">Medical Procedure</option>
                      <option value="equipment">Medical Equipment</option>
                    </Field>
                    <ErrorMessage name="typeofRequest" component="div" className={styles.errorMessage} />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="priority" className={styles.inputLabel}>Priority Level</label>
                    <Field
                      as="select"
                      id="priority"
                      name="priority"
                      className={styles.selectField}
                    >
                      <option value="">Select priority</option>
                      <option value="low" className={styles.priorityLow}>Low</option>
                      <option value="medium" className={styles.priorityMedium}>Medium</option>
                      <option value="high" className={styles.priorityHigh}>High</option>
                      <option value="urgent" className={styles.priorityUrgent}>Urgent</option>
                    </Field>
                    <ErrorMessage name="priority" component="div" className={styles.errorMessage} />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.inputLabel}>Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Provide detailed information about the request"
                    className={styles.textareaField}
                    rows="5"
                  />
                  <ErrorMessage name="description" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>Attachments</label>
                  <div className={styles.fileUploadContainer}>
                    <div className={styles.fileUploadBox}>
                      <input
                        type="file"
                        id="attachments"
                        multiple
                        onChange={handleFileChange}
                        className={styles.fileInput}
                      />
                      <div className={styles.fileUploadContent}>
                        <Icon icon="ph:upload-simple" className={styles.uploadIcon} />
                        <p>Drag files here or click to browse</p>
                        <span className={styles.fileUploadHint}>
                          Supported formats: PDF, JPG, PNG (max 5MB each)
                        </span>
                      </div>
                    </div>
                    
                    {attachments.length > 0 && (
                      <div className={styles.attachmentsList}>
                        {attachments.map((file, index) => (
                          <div key={index} className={styles.attachmentItem}>
                            <Icon 
                              icon={
                                file.type.includes('pdf') ? 'ph:file-pdf' :
                                file.type.includes('image') ? 'ph:image' : 'ph:file'
                              } 
                              className={styles.fileIcon}
                            />
                            <span className={styles.fileName}>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className={styles.removeButton}
                            >
                              <Icon icon="ph:x" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className={styles.cancelButton}
                    disabled={isSubmitting || isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting || isLoading || !patient.id}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <Icon icon="ph:spinner-gap" className={styles.spinner} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Icon icon="ph:paper-plane-right" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}


