/* eslint-disable @typescript-eslint/no-unused-vars */
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

const getRequestData = async (id: string, token: string) => {
  const postLink = `${config.backend}/request/get/id`;
  console.log(postLink);
  try {
    const response = await axios.post(
      postLink,
      { id: 4 },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    console.log()
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};

export { getRequestData };
