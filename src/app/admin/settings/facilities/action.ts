"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

export const getFacilities = async (token: string) => {
  noStore();
  const url = `${config.backend}/admin/facilities`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { success: false, message: "Failed to fetch facilities", data: [] };
  }
};

export const getFacilityById = async (id: number, token: string) => {
  noStore();
  const url = `${config.backend}/admin/facilities/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching facility with ID ${id}:`, error);
    return { success: false, message: "Failed to fetch facility details" };
  }
};

export const deleteFacility = async (id: number, token: string) => {
  noStore();
  const url = `${config.backend}/admin/facilities/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error deleting facility with ID ${id}:`, error);
    return { success: false, message: "Failed to delete facility" };
  }
};
