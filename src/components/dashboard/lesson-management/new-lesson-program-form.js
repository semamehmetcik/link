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
import { config } from "../../../helpers/config";
import { createLessonProgram } from "../../../api/lesson-program-service";
import { MultiSelect } from "primereact/multiselect";
import { getAllLessons } from "../../../api/lesson-service";
import { getAllEducationTerms } from "../../../api/education-term-service";

const NewLessonProgramForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [terms, setTerms] = useState([])

  const initialValues = {
    lessonIdList: [],
    day: "",
    educationTermId: "",
    startTime: "",
    stopTime: "",
  };

  const validationSchema = Yup.object({
    lessonIdList: Yup.array().min(1, "Required").required("Required"),
    day: Yup.string().required("Required").oneOf(config.days, "Invalid day"),
    educationTermId: Yup.string().required("Required"),
    startTime: Yup.string().required("Required"),
    stopTime: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await createLessonProgram(values);
      formik.resetForm();
      dispatch(setListRefreshToken(Math.random()));
      dispatch(setOperation(null));
      swalAlert("Program was created successfully", "success");
    } catch (err) {
      let errMsg = "";
      if (err.response.data.validations) {
        errMsg = Object.values(err.response.data.validations)[0];
      } else {
        errMsg = err.response.data.message;
      }

      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    dispatch(setOperation(null));
  };

  const loadLessons = async () => { 
    
    try {
        const data = await getAllLessons();
        setLessons(data);

    } catch (err) {
      console.log(err)
    }

  }

  const loadEducationTerms = async () => { 
    
    try {
        const data = await getAllEducationTerms();
        setTerms(data);

    } catch (err) {
      console.log(err)
    }

  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    loadLessons();
    loadEducationTerms();
  }, [])
  

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>New Program</Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              <Col>
                
                  <MultiSelect
                    value={formik.values.lessonIdList}
                    onChange={(e) => formik.setFieldValue("lessonIdList", e.value)}
                    options={lessons}
                    display="chip"
                    placeholder="Select Lessons"
                    optionValue="lessonId"
                    optionLabel="lessonName"
                  />
                 
               
              </Col>

              <Col>
                <FloatingLabel controlId="term" label="Term" className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    {...formik.getFieldProps("educationTermId")}
                    isValid={isValid(formik, "educationTermId")}
                    isInvalid={isInValid(formik, "educationTermId")}
                  >
                    <option>Select Term</option>
                    {terms.map((item) => (
                      <option value={item.id}>{item.term} {item.startDate}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.educationTermId}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel controlId="day" label="Day" className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    {...formik.getFieldProps("day")}
                    isValid={isValid(formik, "day")}
                    isInvalid={isInValid(formik, "day")}
                  >
                    <option>Select Day</option>
                    {config.days.map((term) => (
                      <option value={term}>{term}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.day}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>


              <Col>
                <FloatingLabel
                  controlId="startTime"
                  label="Start Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("startTime")}
                    isValid={isValid(formik, "startTime")}
                    isInvalid={isInValid(formik, "startTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.startTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="stopTime"
                  label="Stop Time"
                  className="mb-3"
                >
                  <Form.Control
                    type="time"
                    placeholder=""
                    {...formik.getFieldProps("stopTime")}
                    isValid={isValid(formik, "stopTime")}
                    isInvalid={isInValid(formik, "stopTime")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.stopTime}
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

export default NewLessonProgramForm;