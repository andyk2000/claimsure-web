"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

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
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

export const updateFacility = async (facilityData: FacilityData, token: string) => {
  noStore();
  const postLink = `${config.backend}/facilities/${facilityData.id}`;
  try {
    const response = await axios.put(
      postLink,
      facilityData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating facility:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to update facility" 
    };
  }
};