"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
const config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    role: string;
    name: string;
    institution?: string;
  };
}

export async function login(user: User): Promise<LoginResponse> {
  const postLink = `${config.backend}/home/login`;
  
  try {
    const response = await axios.post(postLink, user);
    console.log(response);
    noStore();
    
    if (response.data && response.data.token && response.data.user) {
      // Set cookies for server-side auth
      const cookieStore = cookies();
      (await cookieStore).set("token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      
      return {
        success: true,
        message: "Login successful",
        token: response.data.token,
        user: response.data.user,
      };
    } else {
      return {
        success: false,
        message: "Invalid response from server",
      };
    }
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with an error status code
      const status = error.response.status;
      
      if (status === 401) {
        return {
          success: false,
          message: "Invalid email or password. Please try again.",
        };
      } else if (status === 403) {
        return {
          success: false,
          message: "Your account is locked. Please contact an administrator.",
        };
      } else if (status === 429) {
        return {
          success: false,
          message: "Too many login attempts. Please try again later.",
        };
      } else {
        return {
          success: false,
          message: `Server error: ${error.response.data?.message || "Unknown error"}`,
        };
      }
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        message: "No response from server. Please check your internet connection.",
      };
    } else {
      // Error setting up the request
      return {
        success: false,
        message: "Failed to connect to server. Please try again later.",
      };
    }
  }
}

export async function logout() {
  const cookieStore = cookies();
  (await cookieStore).delete("token");
  revalidatePath("/");
  redirect("/login");
}




