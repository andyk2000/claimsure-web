"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

interface User {
  email: string;
  password: string;
  names: string;
  institutionId: number;
  title: string;
  phone: number;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

const getMDFs = async () => {
  const postLink = `${config.backend}/mdfs/`;
  try {
    const response = await axios.get(postLink);
    console.log(response.data);
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Error:", data: null };
  }
};

const createUser = async (user: User) => {
  const postLink = `${config.backend}home/signup/`;

  try {
    const response = await axios.post(postLink, user);
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error posting data:", error);
    return { success: false, message: "Error:", data: null };
  }
};

const pageRedirect = () => {
  redirect("/");
};

export { getMDFs, pageRedirect, createUser };
