"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { createUser, getMDFs, pageRedirect } from "./action";

interface User {
  email: string;
  password: string;
  names: string;
  institutionId: number;
  title: string;
  phone: number;
}

interface mdfType {
  name: string;
  id: number;
}

export default function Signup() {
  const user = {
    email: "",
    password: "",
    names: "",
    institutionId: 1,
    title: "",
    phone: 0,
  };

  const validationSchema = Yup.object({
    names: Yup.string().required("* Full names are required"),
    email: Yup.string()
      .email("* Invalid email address")
      .required("* Email is required"),
    password: Yup.string()
      .required("* Password is required")
      .min(8, "* Password must be at least 8 characters"),
    institutionId: Yup.number().min(1, "* Please select a facility"),
    title: Yup.string().required("* Please select a title"),
    phone: Yup.number()
      .min(720000000, "* Phone number must be valid")
      .required("* Phone number is required"),
  });

  const [icon, setIcon] = useState("ph:eye-slash-fill");
  const [passwordType, setPasswordType] = useState("password");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mdfs, setMdfs] = useState<mdfType[]>([]);

  const changeVisibility = () => {
    setVisible(!visible);
    if (visible) {
      setIcon("ph:eye-slash-fill");
      setPasswordType("password");
    } else {
      setIcon("ph:eye-fill");
      setPasswordType("text");
    }
  };

  const submitAnswer = async (values: User) => {
    setLoading(true);
    const result = await createUser(values);
    console.log(result);
    if (result.message === "failed") {
      Swal.fire({
        title: "Registration Failed",
        text: "There was an error creating your account. Please try again.",
        icon: "error",
      });
      setLoading(false);
    } else {
      Swal.fire({
        title: "Registration Successful",
        text: "Your account has been created. You will be redirected to login.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        pageRedirect();
      });
    }
  };

  useEffect(() => {
    const getAllMdfs = async () => {
      try {
        const results = await getMDFs();
        console.log(results);
        if (results.success && Array.isArray(results.data.data)) {
          setMdfs(results.data.data);
        } else {
          console.error(
            "Failed to fetch MDFs or invalid data format:",
            results
          );
          setMdfs([]); // Set to empty array on error
        }
      } catch (error) {
        console.error("Error fetching MDFs:", error);
        setMdfs([]); // Set to empty array on error
      }
    };

    getAllMdfs();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftSection}>
        <div className={styles.leftSectionContent}>
          <h1 className={styles.leftSectionTitle}>
            Join Our Healthcare Network
          </h1>
          <p className={styles.leftSectionSubTitle}>
            Create an account to streamline your healthcare approvals and
            provide better care for your patients.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/Doctor2.png"
            alt="doctor-illustration"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.logoSection}>
          <Image src="/Logo.png" alt="logo" width={50} height={50} />
          <p className={styles.logoText}>ClaimSure</p>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Create an Account</h2>

          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={submitAnswer}
          >
            {({ errors, touched }) => (
              <Form className={styles.formSubContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor="names" className={styles.formLabel}>
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="names"
                    name="names"
                    placeholder="Enter your full name"
                    className={styles.fieldInput}
                  />
                  <ErrorMessage
                    name="names"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    className={styles.fieldInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number
                  </label>
                  <Field
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="250700000000"
                    className={styles.fieldInput}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="institutionId" className={styles.formLabel}>
                    Medical Facility
                  </label>
                  <Field
                    as="select"
                    id="institutionId"
                    name="institutionId"
                    className={styles.fieldInput}
                  >
                    <option value="">Select a facility</option>
                    {Array.isArray(mdfs) && mdfs.length > 0 ? (
                      mdfs.map((rowData: mdfType) => (
                        <option key={rowData.id} value={rowData.id}>
                          {rowData.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No facilities available</option>
                    )}
                  </Field>
                  <ErrorMessage
                    name="institutionId"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.formLabel}>
                    Professional Title
                  </label>
                  <Field
                    as="select"
                    id="title"
                    name="title"
                    className={styles.fieldInput}
                  >
                    <option value="">Select your title</option>
                    <option value="General Doctor">General Doctor</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Pediatric Doctor">Pediatric Doctor</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Neurologist">Neurologist</option>
                  </Field>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <div className={styles.passwordField}>
                    <Field
                      type={passwordType}
                      id="password"
                      name="password"
                      placeholder="Create a secure password"
                      className={styles.passwordInput}
                    />
                    <Icon
                      icon={icon}
                      width={24}
                      height={24}
                      color="grey"
                      className={styles.eyeIcon}
                      onClick={changeVisibility}
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <button
                  className={styles.loginButtonActive}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Icon
                      icon="ph:spinner-gap"
                      style={{ color: "white" }}
                      height={25}
                      width={25}
                      className={styles.spinner}
                    />
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className={styles.signUpredirect}>
                  Already have an account?{" "}
                  <Link href="/login" className={styles.signUpLink}>
                    Log in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
