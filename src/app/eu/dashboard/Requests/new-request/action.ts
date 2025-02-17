import { redirect } from "next/navigation";
import axios from "axios";
// import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

interface Request {
  id: number;
  doctorId: number;
  medicalFacilityId: number;
  title: string;
  description: string;
  resources: string;
  status: string;
  date: string;
}

const config: Config = {
  backend: process.env.BACKEND_LINK || "http://localhost:3001",
};

const createrequest = async (requestData: Request, token: string) => {
  const postLink = `${config.backend}/requests/new-request`;
  try {
    const response = await axios.post(postLink, requestData, {
      headers: {
        Authorizations: token,
      },
    });
    return { success: true, message: "success", data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const getPatient = async (patientId: number, token: string) => {
  const postLink = `${config.backend}/patient/get-patient-personal-Id`;
  try {
    const response = await axios.post(
      postLink,
      { id: patientId },
      {
        headers: {
          Authorizations: token,
        },
      }
    );
    if (response.data.patient) {
      console.log(response);
      return {
        success: true,
        data: response.data,
        message: "patient found proceed",
      };
    } else {
      console.log(response);
      return { success: false, message: "patient not found" };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const pageRedirect = () => {
  redirect("/");
};

export { createrequest, pageRedirect, getPatient };
