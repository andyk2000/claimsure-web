"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

export const getPatientDetails = async (patientId: number, token: string) => {
  noStore();
  
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
      // Transform backend data to match the frontend PatientData interface
      const patientData = {
        id: response.data.patient.id || patientId,
        name: response.data.patient.names || "",
        age: response.data.patient.age || 0,
        gender: response.data.patient.sex || "",
        dateOfBirth: response.data.patient.dateOfBirth || "",
        bloodType: response.data.patient.bloodType || "",
        insuranceId: response.data.patient.insuranceId || "",
        contactNumber: response.data.patient.contactNumber || "",
        email: response.data.patient.email || "",
        address: response.data.patient.address || "",
        allergies: response.data.patient.allergies || [],
        currentMedications: response.data.patient.currentMedications || [],
        status: response.data.patient.status || "Active"
      };
      
      return {
        success: true,
        data: patientData,
        message: "Patient details retrieved successfully"
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
    console.error("Error fetching patient details:", error);
    return { 
      success: false, 
      message: "Failed to fetch patient details", 
      data: null 
    };
  }
};

/**
 * Update patient details
 * @param patientId The ID of the patient to update
 * @param patientData The updated patient data
 * @param token Authentication token
 * @returns Object containing success status and message
 */
export const updatePatientDetails = async (patientId: number, patientData: any, token: string) => {
  try {
    const response = await axios.post(
      `${config.backend}/patient/update`,
      {
        id: patientId,
        ...patientData
      },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    
    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Patient details updated successfully"
      };
    } else {
      return { 
        success: false, 
        message: response.data.message || "Failed to update patient details"
      };
    }
  } catch (error) {
    console.error("Error updating patient details:", error);
    return { 
      success: false, 
      message: "An error occurred while updating patient details"
    };
  }
};