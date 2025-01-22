"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { pageRedirect, login, checkLogged } from "./action";
import Swal from "sweetalert2";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const user = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("* Invalid email address")
      .required("* Email is required"),
    password: Yup.string().required("* Password is required"),
  });

  const [icon, setIcon] = useState("ph:eye-slash-fill");
  const [passwordType, setPasswordType] = useState("password");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    // setLoading(true);
    // const result = await handleSubmit({
    //   email: values.email,
    //   password: values.password,
    // });
    // console.log(result);
    // if (result.message == "failed") {
    //   Swal.fire({
    //     title: "Login failed",
    //     text: "check your email and password again.",
    //     icon: "error",
    //   });
    //   setLoading(false);
    // } else {
    //   pageRedirect();
    // }

    setLoading(true);
    const result = await login({
      email: values.email,
      password: values.password,
    });
    console.log(result);
    if (result.message === "failed") {
      Swal.fire({
        title: "Login Failed",
        text: "Check your email and password again.",
        icon: "error",
      });
      setLoading(false);
    } else {
      pageRedirect();
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (typeof token === "string") {
        await checkLogged(token);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <Image src="/doctor1.png" alt="doctor-cover" width={350} height={350} />
      </div>
      <div className={styles.formConatiner}>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={submitAnswer}
        >
          <Form method="post" className={styles.formContainer}>
            <div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="email@youremail.com"
                className={styles.fieldInput}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <div className={styles.passwordField}>
                <Field
                  type={passwordType}
                  id="password"
                  name="password"
                  placeholder="password"
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
            <div className={styles.signUpredirect}>
              You don’t have an account? Click{" "}
              <Link href="/signup" className={styles.signUpLink}>
                Here
              </Link>
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
                "Login"
              )}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
