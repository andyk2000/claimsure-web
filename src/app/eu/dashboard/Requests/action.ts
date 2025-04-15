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

const navigateNewRequest = () => {
  redirect("/eu/dashboard/Requests/new-request");
};

const getRequests = async () => {
  const postLink = `${config.backend}/request/get/dID`;
  try {
    const response = await axios.post(postLink, {
      id: 1,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Error:", data: [] };
  }
};

export { navigateNewRequest, getRequests };
