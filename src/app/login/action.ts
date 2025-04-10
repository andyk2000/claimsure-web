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
}

// interface Message {
//   message: string;
//   token?: string;
// }

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

const login = async (user: User) => {
  const postLink = `${config.backend}/home/login`;
  try {
    const response = await axios.post(postLink, user);
    console.log(response.data);
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Error:", data: null };
  }
};

const checkLogged = async (token: string) => {
  try {
    const postLink = `${config.backend}/mdfs/`;
    const response = await axios.post(postLink, {
      headers: {
        Authorizations: token,
      },
    });
    noStore();
    redirect("/");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const pageRedirect = () => {
  redirect("/");
};

export { pageRedirect, login, checkLogged };
