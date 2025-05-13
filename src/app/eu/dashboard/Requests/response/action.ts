"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

export const getRequestData = async (id: number, token: string) => {
  noStore();
  const postLink = `${config.backend}/request/get/id`;
  try {
    const response = await axios.post(
      postLink,
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching request data:", error);
    return null;
  }
};

export const approveRequest = async (id: number, token: string) => {
  noStore();
  const postLink = `${config.backend}/request/approve`;
  try {
    const response = await axios.post(
      postLink,
      { id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

export const rejectRequest = async (id: number, token: string, reason?: string) => {
  noStore();
  const postLink = `${config.backend}/request/reject`;
  try {
    const response = await axios.post(
      postLink,
      { id, reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};
