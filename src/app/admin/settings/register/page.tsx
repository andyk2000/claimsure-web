"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { registerFacility } from "./action";
import styles from "./page.module.css";

interface FacilityData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  type: string;
  licenseNumber: string;
  taxId: string;
  status: string;
}

export default function RegisterFacility() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues: FacilityData = {
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    type: "Hospital",
    licenseNumber: "",
    taxId: "",
    status: "Active"
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Facility name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    type: Yup.string().required("Facility type is required"),
    licenseNumber: Yup.string().required("License number is required"),
    taxId: Yup.string().required("Tax ID is required"),
    status: Yup.string().required("Status is required")
  });

  const handleSubmit = async (values: FacilityData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const result = await registerFacility(values, token);
      
      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Medical facility registered successfully",
          icon: "success",
        }).then(() => {
          router.push("/admin/settings/facilities");
        });
      } else {
        throw new Error(result.message || "Failed to register facility");
      }
    } catch (error) {
      console.error("Error registering facility:", error);
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to register facility",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Icon
          icon="ph:arrow-left-bold"
          width="25"
          height="25"
          className={styles.backButton}
          color="#242e8f"
          onClick={() => router.back()}
        />
        <h2 className={styles.pageTitle}>Register Medical Facility</h2>
        <div></div>
      </div>

      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Facility Name</label>
                  <Field type="text" id="name" name="name" className={styles.input} />
                  <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="type">Facility Type</label>
                  <Field as="select" id="type" name="type" className={styles.input}>
                    <option value="Hospital">Hospital</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Imaging Center">Imaging Center</option>
                    <option value="Rehabilitation Center">Rehabilitation Center</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address</label>
                  <Field type="text" id="address" name="address" className={styles.input} />
                  <ErrorMessage name="address" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <Field type="text" id="city" name="city" className={styles.input} />
                  <ErrorMessage name="city" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="state">State</label>
                  <Field type="text" id="state" name="state" className={styles.input} />
                  <ErrorMessage name="state" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode">Zip Code</label>
                  <Field type="text" id="zipCode" name="zipCode" className={styles.input} />
                  <ErrorMessage name="zipCode" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <Field type="text" id="phone" name="phone" className={styles.input} />
                  <ErrorMessage name="phone" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" className={styles.input} />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="licenseNumber">License Number</label>
                  <Field type="text" id="licenseNumber" name="licenseNumber" className={styles.input} />
                  <ErrorMessage name="licenseNumber" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="taxId">Tax ID</label>
                  <Field type="text" id="taxId" name="taxId" className={styles.input} />
                  <ErrorMessage name="taxId" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="status">Status</label>
                  <Field as="select" id="status" name="status" className={styles.input}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending Verification</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className={styles.errorMessage} />
                </div>
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon icon="ph:spinner-gap" className={styles.spinner} width="20" height="20" />
                      Registering...
                    </>
                  ) : (
                    "Register Facility"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
