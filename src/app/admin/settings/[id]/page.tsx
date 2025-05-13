"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";
import { getFacilityById } from "../../action";
import { updateFacility } from "./action";
import styles from "./page.module.css";

interface FacilityData {
  id: number;
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

export default function EditFacility({ params }: { params: { id: string } }) {
  const router = useRouter();
  const facilityId = parseInt(params.id);
  
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<FacilityData>({
    id: facilityId,
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    type: "",
    licenseNumber: "",
    taxId: "",
    status: ""
  });

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

  useEffect(() => {
    const loadFacility = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const result = await getFacilityById(facilityId, token);
        
        if (result.success) {
          setInitialValues({
            id: facilityId,
            name: result.data.name,
            address: result.data.address,
            city: result.data.city,
            state: result.data.state,
            zipCode: result.data.zipCode,
            phone: result.data.phone,
            email: result.data.email,
            type: result.data.type,
            licenseNumber: result.data.licenseNumber,
            taxId: result.data.taxId,
            status: result.data.status
          });
        } else {
          throw new Error(result.message || "Failed to load facility details");
        }
      } catch (error) {
        console.error("Error loading facility details:", error);
        Swal.fire({
          title: "Error",
          text: error instanceof Error ? error.message : "Failed to load facility details",
          icon: "error",
        }).then(() => {
          router.push("/admin/settings/facilities");
        });
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [facilityId, router]);

  const handleSubmit = async (values: FacilityData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token") || "";
      const result = await updateFacility(values, token);
      
      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Facility updated successfully",
          icon: "success",
        }).then(() => {
          router.push("/admin/settings/facilities");
        });
      } else {
        throw new Error(result.message || "Failed to update facility");
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Failed to update facility",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading facility details...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon
            icon="ph:arrow-left-bold"
            width="25"
            height="25"
            className={styles.backIcon}
            color="#242e8f"
            onClick={handleBack}
          />
          <h2 className={styles.pageTitle}>Edit Facility</h2>
        </div>
      </div>

      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="ph:spinner-gap" className={styles.spinner} width="20" height="20" />
                      Updating...
                    </>
                  ) : (
                    "Update Facility"
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

