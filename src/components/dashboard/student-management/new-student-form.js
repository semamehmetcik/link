import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { isInValid, isValid } from "../../../helpers/functions/forms";
import { useDispatch } from "react-redux";
import {
  setListRefreshToken,
  setOperation,
} from "../../../store/slices/misc-slice";
import { swalAlert } from "../../../helpers/functions/swal";
import ButtonLoader from "../../common/button-loader";
import { createStudent } from "../../../api/student-service";
import { getAllAdvisorTeachers } from "../../../api/advisor-teacher-service";
import ReactInputMask from "react-input-mask-next";

const NewStudentForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [advisorTeachers, setAdvisorTeachers] = useState([]);

  const initialValues = {
    birthDay: "",
    birthPlace: "",
    gender: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
    email: "",
    advisorTeacherId: "",
    fatherName: "",
    motherName: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    gender: Yup.string()
      .required("Required")
      .oneOf(["MALE", "FEMALE"], "Invalid gender"),
    birthDay: Yup.date().required("Required"),
    birthPlace: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{3}-\d{4}/g, "Invalid phone number"),
    ssn: Yup.string()
      .required("Required")
      .matches(/\d{3}-\d{2}-\d{4}/g, "Invalid ssn"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    fatherName: Yup.string().required("Required"),
    motherName: Yup.string().required("Required"),
    advisorTeacherId: Yup.number().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "At least 8 characters")
      .matches(/[a-z]+/g, "One lowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createStudent(values);
      formik.resetForm();
      dispatch(setOperation(null));
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("Student was created successfully", "success");
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loadAdvisorTeachers = async () => {
    try {
      const data = await getAllAdvisorTeachers();

      setAdvisorTeachers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAdvisorTeachers();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Student</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                <FloatingLabel
                  controlId="firstName"
                  label="First name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("name")}
                    isValid={isValid(formik, "name")}
                    isInvalid={isInValid(formik, "name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="lastName"
                  label="Last name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("surname")}
                    isValid={isValid(formik, "surname")}
                    isInvalid={isInValid(formik, "surname")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="floatingSelect" label="Gender">
                  <Form.Select
                    aria-label="Select gender"
                    {...formik.getFieldProps("gender")}
                    isValid={isValid(formik, "gender")}
                    isInvalid={isInValid(formik, "gender")}
                  >
                    <option>Select gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="birtdate"
                  label="Birthdate"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    placeholder=""
                    {...formik.getFieldProps("birthDay")}
                    isValid={isValid(formik, "birthDay")}
                    isInvalid={isInValid(formik, "birthDay")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthDay}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="placeofbirth"
                  label="Place of birth"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("birthPlace")}
                    isValid={isValid(formik, "birthPlace")}
                    isInvalid={isInValid(formik, "birthPlace")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.birthPlace}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="phone"
                  label="Phone (XXX-XXX-XXXX)"
                  className="mb-3"
                >
                  <Form.Control
                    as={ReactInputMask}
                    mask="999-999-9999"
                    type="text"
                    placeholder="Phone (XXX-XXX-XXXX)"
                    {...formik.getFieldProps("phoneNumber")}
                    isValid={isValid(formik, "phoneNumber")}
                    isInvalid={isInValid(formik, "phoneNumber")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder=""
                    {...formik.getFieldProps("email")}
                    isValid={isValid(formik, "email")}
                    isInvalid={isInValid(formik, "email")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="ssn"
                  label="SSN (XXX-XX-XXXX)"
                  className="mb-3"
                >
                  <Form.Control
                    as={ReactInputMask}
                    mask="999-99-9999"
                    type="text"
                    placeholder="SSN (XXX-XX-XXXX)"
                    {...formik.getFieldProps("ssn")}
                    isValid={isValid(formik, "ssn")}
                    isInvalid={isInValid(formik, "ssn")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.ssn}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="fatherName"
                  label="Father Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("fatherName")}
                    isValid={isValid(formik, "fatherName")}
                    isInvalid={isInValid(formik, "fatherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.fatherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="motherName"
                  label="Mother Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("motherName")}
                    isValid={isValid(formik, "motherName")}
                    isInvalid={isInValid(formik, "motherName")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.motherName}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="advisorTeacher"
                  label="Advisor Teacher"
                  className="mb-3"
                >
                  <Form.Select
                    {...formik.getFieldProps("advisorTeacherId")}
                    isValid={isValid(formik, "advisorTeacherId")}
                    isInvalid={isInValid(formik, "advisorTeacherId")}
                  >
                    <option value="">Select Teacher</option>
                    {advisorTeachers.map((item) => (
                      <option value={item.advisorTeacherId} key={item.advisorTeacherId}>
                        {item.teacherName} {item.teacherSurname}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.advisorTeacherId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              

              <Col>
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...formik.getFieldProps("username")}
                    isValid={isValid(formik, "username")}
                    isInvalid={isInValid(formik, "username")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("password")}
                    isValid={isValid(formik, "password")}
                    isInvalid={isInValid(formik, "password")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder=""
                    {...formik.getFieldProps("confirmPassword")}
                    isValid={isValid(formik, "confirmPassword")}
                    isInvalid={isInValid(formik, "confirmPassword")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button variant="warning" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                  className="ms-3"
                >
                  {loading && <ButtonLoader />} Create
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewStudentForm;