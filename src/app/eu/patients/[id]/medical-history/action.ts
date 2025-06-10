"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

/**
 * Fetch patient basic information
 * @param patientId The ID of the patient to fetch
 * @param token Authentication token
 * @returns Object containing success status, data, and message
 */
export const getPatientBasicInfo = async (patientId: number, token: string) => {
  noStore(); // Prevent caching
  
  try {
    const response = await axios.post(
      `${config.backend}/patient/get-patient-Id`,
      { id: patientId },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.patient) {
      // Transform backend data to match the frontend PatientBasicInfo interface
      const patientData = {
        id: response.data.patient.id || patientId,
        name: response.data.patient.names || "",
        age: response.data.patient.age || 0,
        gender: response.data.patient.sex || "",
      };
      
      return {
        success: true,
        data: patientData,
        message: "Patient information retrieved successfully"
      };
    } else {
      console.error("Patient data not found in response:", response.data);
      return { 
        success: false, 
        message: "Patient not found", 
        data: null 
      };
    }
  } catch (error) {
    console.error("Error fetching patient information:", error);
    return { 
      success: false, 
      message: "Failed to fetch patient information", 
      data: null 
    };
  }
};

/**
 * Fetch all medical records for a patient
 * @param patientId The ID of the patient
 * @param token Authentication token
 * @returns Object containing success status, data, and message
 */
export const getMedicalHistory = async (patientId: number, token: string) => {
  noStore(); // Prevent caching
  
  try {
    const response = await axios.post(
      `${config.backend}/medical-records/get-by-patient`,
      { patientId },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.records) {
      // Transform backend data to match the frontend MedicalRecord interface
      const records = response.data.records.map((record: any) => ({
        id: record.id,
        date: record.date,
        type: record.type,
        title: record.title,
        provider: record.provider,
        description: record.description,
        attachments: record.attachments || [],
      }));
      
      return {
        success: true,
        data: records,
        message: "Medical records retrieved successfully"
      };
    } else {
      return { 
        success: true, 
        message: "No medical records found", 
        data: [] 
      };
    }
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return { 
      success: false, 
      message: "Failed to fetch medical records", 
      data: [] 
    };
  }
};

/**
 * Fetch medical records of a specific type for a patient
 * @param patientId The ID of the patient
 * @param recordType The type of medical records to fetch
 * @param token Authentication token
 * @returns Object containing success status, data, and message
 */
export const getMedicalRecordsByType = async (patientId: number, recordType: string, token: string) => {
  noStore(); // Prevent caching
  
  try {
    const response = await axios.post(
      `${config.backend}/medical-records/get-by-type`,
      { 
        patientId,
        type: recordType 
      },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.records) {
      // Transform backend data to match the frontend MedicalRecord interface
      const records = response.data.records.map((record: any) => ({
        id: record.id,
        date: record.date,
        type: record.type,
        title: record.title,
        provider: record.provider,
        description: record.description,
        attachments: record.attachments || [],
      }));
      
      return {
        success: true,
        data: records,
        message: `${recordType} records retrieved successfully`
      };
    } else {
      return { 
        success: true, 
        message: `No ${recordType} records found`, 
        data: [] 
      };
    }
  } catch (error) {
    console.error(`Error fetching ${recordType} records:`, error);
    return { 
      success: false, 
      message: `Failed to fetch ${recordType} records`, 
      data: [] 
    };
  }
};

/**
 * Add a new medical record for a patient
 * @param recordData The medical record data to add
 * @param token Authentication token
 * @returns Object containing success status and message
 */
export const addMedicalRecord = async (recordData: any, token: string) => {
  try {
    const response = await axios.post(
      `${config.backend}/medical-records/add`,
      recordData,
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Medical record added successfully",
        data: response.data.record
      };
    } else {
      return { 
        success: false, 
        message: response.data.message || "Failed to add medical record",
        data: null
      };
    }
  } catch (error) {
    console.error("Error adding medical record:", error);
    return { 
      success: false, 
      message: "An error occurred while adding the medical record",
      data: null
    };
  }
};

/**
 * Delete a medical record
 * @param recordId The ID of the record to delete
 * @param token Authentication token
 * @returns Object containing success status and message
 */
export const deleteMedicalRecord = async (recordId: number, token: string) => {
  try {
    const response = await axios.post(
      `${config.backend}/medical-records/delete`,
      { id: recordId },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Medical record deleted successfully"
      };
    } else {
      return { 
        success: false, 
        message: response.data.message || "Failed to delete medical record"
      };
    }
  } catch (error) {
    console.error("Error deleting medical record:", error);
    return { 
      success: false, 
      message: "An error occurred while deleting the medical record"
    };
  }
};