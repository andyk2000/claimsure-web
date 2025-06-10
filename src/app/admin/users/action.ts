"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  facility: string;
  status: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

export const getUsers = async (token: string) => {
  noStore();
  const url = `${config.backend}/admin/users`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Failed to fetch users", data: [] };
  }
};

export const getUserById = async (id: number, token: string) => {
  noStore();
  const url = `${config.backend}/admin/users/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return { success: false, message: "Failed to fetch user details" };
  }
};

export const updateUserStatus = async (id: number, status: string, token: string) => {
  noStore();
  const url = `${config.backend}/admin/users/${id}/status`;
  try {
    const response = await axios.put(
      url,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error updating user status:`, error);
    return { success: false, message: "Failed to update user status" };
  }
};

export const createUser = async (userData: Omit<User, 'id'>, token: string) => {
  noStore();
  const url = `${config.backend}/admin/users`;
  try {
    const response = await axios.post(
      url,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed to create user" };
  }
};

export const updateUser = async (id: number, userData: Partial<User>, token: string) => {
  noStore();
  const url = `${config.backend}/admin/users/${id}`;
  try {
    const response = await axios.put(
      url,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user" };
  }
};

export const deleteUser = async (id: number, token: string) => {
  noStore();
  const url = `${config.backend}/admin/users/${id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user" };
  }
};