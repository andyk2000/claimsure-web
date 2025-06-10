import { redirect } from "next/navigation";
import axios from "axios";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

/**
 * Get the full user data from localStorage
 */
export const getUserData = () => {
  if (typeof window === "undefined") return null;
  
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Verify if a token is valid by making a request to the backend
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${config.backend}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

/**
 * Get the user's role from localStorage
 */
export const getUserRole = (): string | null => {
  if (typeof window === "undefined") return null;
  
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  
  try {
    const user = JSON.parse(userString);
    return user.role?.toLowerCase() || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Get the user's name from localStorage
 */
export const getUserName = (): string | null => {
  if (typeof window === "undefined") return null;
  
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  
  try {
    const user = JSON.parse(userString);
    return user.name || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Get the user's institution from localStorage
 */
export const getUserInstitution = (): string | null => {
  if (typeof window === "undefined") return null;
  
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  
  try {
    const user = JSON.parse(userString);
    return user.institution || user.facility || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Refresh user data from the server
 */
export const refreshUserData = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  try {
    // Fetch user profile from API
    const response = await fetch('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to refresh user data');
    }
    
    const userData = await response.json();
    
    // Get existing user data and merge with new data
    const existingUserString = localStorage.getItem("user");
    let existingUser = {};
    
    if (existingUserString) {
      try {
        existingUser = JSON.parse(existingUserString);
      } catch (e) {
        console.error("Error parsing existing user data:", e);
      }
    }
    
    // Merge and save updated user data
    const updatedUserData = { ...existingUser, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    
    return true;
  } catch (error) {
    console.error("Error refreshing user data:", error);
    return false;
  }
};

/**
 * Check if the user has the required role
 */
export const hasRole = (requiredRoles: string[]): boolean => {
  const role = getUserRole();
  if (!role) return false;
  return requiredRoles.includes(role);
};

/**
 * Redirect the user based on their role
 */
export const redirectToRoleDashboard = (role: string): void => {
  switch (role.toLowerCase()) {
    case 'admin':
      redirect("/admin/dashboard");
    case 'medical-advisor':
      redirect("/medical-advisor/dashboard");
    case 'doctor':
    case 'healthcare-provider':
    case 'end-user':
      redirect("/eu/dashboard");
    default:
      redirect("/eu/dashboard");
  }
};

/**
 * Get the dashboard URL for a specific role
 */
export const getDashboardForRole = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'admin':
      return "/admin/dashboard";
    case 'medical-advisor':
      return "/medical-advisor/dashboard";
    case 'doctor':
    case 'healthcare-provider':
    case 'end-user':
      return "/eu/dashboard";
    default:
      return "/eu/dashboard";
  }
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("token");
  return !!token;
};

/**
 * Log the user out (client-side)
 */
export const logout = (): void => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Server action to handle logout
 * This is imported from login/action.ts
 */
export { logout as serverLogout } from "@/app/login/action";



