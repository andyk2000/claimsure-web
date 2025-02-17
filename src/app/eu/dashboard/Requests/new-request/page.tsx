"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./page.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createrequest, getPatient } from "./action";
import Swal from "sweetalert2";

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

interface Patient {
  id: number;
  names: string;
  age: number;
  sex: string;
}

export default function NewRequest() {
  const [request] = useState({
    id: 0,
    doctorId: 0,
    medicalFacilityId: 0,
    title: "",
    description: "",
    resources: "",
    status: "",
    date: "02-12-2025",
  });

  const [patient, setPatient] = useState<Patient>({
    id: 1,
    age: 0,
    names: "",
    sex: "",
  });

  const validationSchema = Yup.object({
    id: Yup.number().min(1).required("* The patient Id is needed"),
    doctorId: Yup.number()
      .min(1)
      .required("* The doctor of the request is needed"),
    medicalFacilityId: Yup.number()
      .min(1)
      .required("* The medical facility of the request is needed"),
    title: Yup.string().required("* The title of the request is needed"),
    description: Yup.string().required("Add a description of the treatment"),
    resources: Yup.object(),
  });

  const validationSchema2 = Yup.object({
    id: Yup.number().min(1).required("* The patient Id is needed"),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkUSer = async (values: { id: number }, {setFieldValue}: any) => {
    const token = localStorage.getItem("token") || "";
    console.log(values);
    try {
      const result = await getPatient(values.id, token);
      if (!result.success) {
        Swal.fire({
          title: "Patient not found",
          text: "Patient not found, check again.",
          icon: "error",
        });
      } else {
        setPatient(result.data);
        setFieldValue("names", result.data.names);
        setFieldValue("age", result.data.patient.age);
        setFieldValue("sex", result.data.patient.sex);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

  const submitAnswer = async (values: Request) => {
    const token = localStorage.getItem("token") || "";
    const result = await createrequest(values, token);

    if (result.success) {
      Swal.fire({
        title: "Request Submitted",
        text: "Your request has been successfully created.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Submission Failed",
        text: "An error occurred while creating the request. Please try again.",
        icon: "error",
      });
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
        />
        <h2 className={styles.pageTitle}>New request</h2>
        <Icon
          icon="ph:dots-three-outline-vertical-fill"
          width="25"
          height="25"
          className={styles.moreButton}
          color="#242e8f"
        />
      </div>

      <Formik
        initialValues={patient}
        validationSchema={validationSchema2}
        onSubmit={checkUSer}
        enableReinitialize={true}
      >
        <Form method="post" className={styles.formContainer}>
          <div className={styles.patientSection}>
            <div className={styles.patientIdSection}>
              <p className={styles.inputLabel}>Patient ID</p>
              <div className={styles.inputFieldSection}>
                <div>
                  <Field
                    type="text"
                    id="id"
                    name="id"
                    placeholder="000000"
                    className={styles.smallFieldInput}
                  />
                  <button className={styles.patientCheckBttn} type="submit">
                    Check
                  </button>
                </div>
                <ErrorMessage
                  name="id"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.patientNameSection}>
              <p className={styles.inputLabel}>Patient Name</p>
              <div className={styles.inputFieldSection}>
                <Field
                  type="text"
                  id="names"
                  name="names"
                  placeholder="Patient Name"
                  className={styles.fieldInputDisabled}
                  disabled
                />
              </div>
            </div>
            <div className={styles.ageSexSection}>
              <div className={styles.ageSection}>
                <p className={styles.inputLabel}>Age</p>
                <div className={styles.inputFieldSection}>
                  <Field
                    type="number"
                    id="age"
                    name="age"
                    placeholder="000000"
                    className={styles.smallFieldInputDisabled}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.sexSection}>
                <p className={styles.inputLabel}>Sex</p>
                <div className={styles.inputFieldSection}>
                  <Field
                    type="text"
                    id="patientId"
                    name="patientId"
                    placeholder="M"
                    className={styles.smallFieldInputDisabled}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>

      <Formik
        initialValues={request}
        validationSchema={validationSchema}
        onSubmit={submitAnswer}
      >
        <Form method="post" className={styles.formContainer}>
          <div className={styles.titleSection}>
            <p className={styles.inputLabel}>Title</p>
            <div className={styles.inputFieldSection}>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title of the request"
                className={styles.fieldInput}
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.errorMessage}
              />
            </div>
          </div>
          <div className={styles.requestSection}>
            <div className={styles.requestTypeSection}>
              <p className={styles.inputLabel}>Type of request</p>
              <div className={styles.inputFieldSection}>
                <Field
                  as="select"
                  id="typeofRequest"
                  name="typeofRequest"
                  placeholder="--------------------------------"
                  className={styles.fieldInput}
                >
                  <option value="1" label="medecine prescription" />
                  <option value="2" label="abdominal MRI" />
                  <option value="2" label="physio therapy" />
                </Field>
                <ErrorMessage
                  name="typeofRequest"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.requestPriority}>
              <p className={styles.inputLabel}>Priority</p>
              <div className={styles.inputFieldSection}>
                <Field
                  as="select"
                  id="priority"
                  name="priority"
                  placeholder="--------------------------------"
                  className={styles.fieldInput}
                >
                  <option
                    value="1"
                    label="Low"
                    className={styles.priorityLow}
                  />
                  <option
                    value="2"
                    label="Medium"
                    className={styles.priorityMedium}
                  />
                  <option
                    value="2"
                    label="High"
                    className={styles.priorityHigh}
                  />
                </Field>
                <ErrorMessage
                  name="priority"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.requestDetailSection}>
              <p className={styles.inputLabel}>Priority</p>
              <div className={styles.inputFieldSection}>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Details of the Request"
                  className={styles.fieldAreaInput}
                  rows="7"
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.requestDocumentSection}>
              <p className={styles.inputLabel}>Additional documents</p>
              <div className={styles.inputFieldSection}>
                <Field
                  type="file"
                  id="details"
                  name="details"
                  className={styles.mediumFieldInput}
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
          </div>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
