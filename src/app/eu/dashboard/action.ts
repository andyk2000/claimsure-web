"use server";

import { redirect } from "next/navigation";
// import axios from "axios";
// import { unstable_noStore as noStore } from "next/cache";

const navigateNewRequest = () => {
  redirect("/eu/dashboard/Requests/new-request");
};



export { navigateNewRequest };
