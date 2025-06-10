"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { login } from "./action";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getDashboardForRole,
  isAuthenticated,
  getUserRole,
} from "@/utils/auth";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [icon, setIcon] = useState("ph:eye-slash-fill");
  const [passwordType, setPasswordType] = useState("password");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
    try {
      const result = await login({
        email: values.email,
        password: values.password,
      });

      console.log(result);

      if (!result.success || !result.user) {
        Swal.fire({
          title: "Login Failed",
          text: result.message || "Check your email and password again.",
          icon: "error",
        });
        setLoading(false);
        return;
      }

      // Store token and user info in localStorage
      const { token, user } = result;
      localStorage.setItem("token", token || "");
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on user role
      if (user && user.role) {
        const dashboardUrl = getDashboardForRole(user.role);
        router.push(dashboardUrl);
      } else {
        // If role is not available, default to end-user dashboard
        router.push("/eu/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Login Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role) {
        const dashboardUrl = getDashboardForRole(role);
        router.push(dashboardUrl);
      } else {
        // If role is not available, default to end-user dashboard
        router.push("/eu/dashboard");
      }
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <div className={styles.leftSection}>
        <div className={styles.logoSection}>
          <Image src="/Logo.png" alt="logo" width={50} height={50} />
          <p className={styles.logoText}>ClaimSure</p>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <p className={styles.formHeaderText}>Login</p>
            <p className={styles.formHeaderSubText}>
              Welcome back! Please enter your details.
            </p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={submitAnswer}
          >
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formInput}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Password
                </label>
                <div className={styles.passwordInputContainer}>
                  <Field
                    type={passwordType}
                    id="password"
                    name="password"
                    className={styles.formInput}
                    placeholder="Enter your password"
                  />
                  <Icon
                    icon={icon}
                    className={styles.passwordVisibilityIcon}
                    onClick={changeVisibility}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.formOptions}>
                <div className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className={styles.checkbox}
                  />
                  <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className={
                  loading
                    ? styles.loginButtonDisabled
                    : styles.loginButtonActive
                }
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loadingSpinner}></div>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className={styles.signUpredirect}>
                Don't have an account?{" "}
                <Link href="/signup" className={styles.signUpLink}>
                  Sign up
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rightSectionContent}>
          <p className={styles.rightSectionTitle}>
            Streamlining Healthcare Approvals
          </p>
          <p className={styles.rightSectionSubTitle}>
            Efficient, transparent, and patient-centered request management
          </p>
        </div>
      </div>
    </div>
  );
}



