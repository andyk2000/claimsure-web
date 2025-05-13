"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

interface FacilityData {
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

export const registerFacility = async (facilityData: FacilityData, token: string) => {
  noStore();
  const url = `${config.backend}/admin/facilities/register`;
  try {
    const response = await axios.post(url, facilityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registering facility:", error);
    return { 
      success: false, 
      message: "Failed to register facility. Please check your information and try again." 
    };
  }
};
