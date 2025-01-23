"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
// import clsx from "clsx";
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
    password: Yup.string().required("* Password is required"),
    institutionId: Yup.number().min(1),
    title: Yup.string().required(),
    phone: Yup.number().min(720000000),
  });
  const [icon, setIcon] = useState("ph:eye-slash-fill");
  const [passwordType, setPasswordType] = useState("password");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mdfs, setMdfs] = useState([
    {
      name: "",
      id: 0,
    },
  ]);

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
    const getMdfs = async () => {
      const results = await getMDFs();
      setMdfs(results.data);
    };

    getMdfs();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.coverImageContainer}>
        <div>
          <Image
            src="/Doctor2.png"
            alt="doctor-cover"
            width={275}
            height={275}
          />
        </div>
      </div>
      <div className={styles.formConatiner}>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={submitAnswer}
        >
          <Form method="post" className={styles.formSubContainer}>
            <div className={styles.formTitle}>Create an Account</div>
            <div>
              <Field
                type="text"
                id="names"
                name="names"
                placeholder="Full Names"
                className={styles.fieldInput}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="email@youremail.com"
                className={styles.fieldInput}
              />
              <ErrorMessage
                name="mdf"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
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
            <div>
              <Field
                as="select"
                id="institutionId"
                name="institutionId"
                placeholder="-------------"
                className={styles.fieldInput}
              >
                {mdfs.map((rowData: mdfType, index: number) => (
                  <>
                    <option key={index} value={rowData.id}>
                      {rowData.name}
                    </option>
                    ;
                  </>
                ))}
              </Field>
              <ErrorMessage
                name="institutionId"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <Field
                as="select"
                id="title"
                name="title"
                placeholder="-------------"
                className={styles.fieldInput}
              >
                <option value="General Doctor">General Doctor</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Pediatric Doctor">Pediatric Doctor</option>
                <option value="Surgeon">Surgeon</option>
              </Field>
              <ErrorMessage
                name="title"
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
              <Link href="/login" className={styles.signUpLink}>
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
