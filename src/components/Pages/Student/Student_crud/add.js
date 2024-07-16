import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DropImg } from "../../Property/StepForm/component/DropImg";
import { createStudent } from "../../../../redux/Action/StudentAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { createStudentByCSV } from "../../../../redux/Action/StudentAction";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

export default function StudentAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { Courses, Semester } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semester: state?.semesters?.semesters,
  }));
  // const SignupSchema = Yup.object().shape({
  //   name: Yup.string().required("*Required"),
  //   roll_no: Yup.number().required("*Required"),
  //   father_name: Yup.string().required("*Required"),
  //   phone_no: Yup.number().required("*Required"),
  //   guardian_no: Yup.string().required("*Required"),
  //   current_address: Yup.string().required("*Required"),
  //   permanent_address: Yup.string().required("*Required"),
  //   batch: Yup.string().required("*Required"),
  //   email: Yup.string().email("Invalid email").required("*Required"),
  //   phone_no: Yup.number().required("*Required"),
  // });
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
  }, []);
  const formik = useFormik({
    initialValues: {
      semester_id: "",
      course_id: "",
    },
    onSubmit: (values) => {
      values = {
        ...values,
      };
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      dispatch(createStudentByCSV(formData));
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Student</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Course</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.course_id}
                            className="form-control required"
                            name="course_id"
                          >
                            <option>Please Select Course</option>
                            {Courses?.length > 0
                              ? Courses?.map((course) => {
                                  return (
                                    <option value={course?._id}>
                                      {course?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.course_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.course_id}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Phase</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.semester_id}
                            className="form-control required"
                            name="semester_id"
                          >
                            <option>Please Select Phase</option>
                            {Semester?.length > 0
                              ? Semester?.map((semester) => {
                                  return (
                                    <option value={semester?._id}>
                                      {semester?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.semester_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.semester_id}
                            </div>
                          ) : null}
                        </Col>
                        <Col lg={3} md={3} xs={12} sm={12}>
                          <label className="form-label">CSV Upload</label>
                          <input
                            type="file"
                            name="file"
                            onChange={(event) =>
                              formik.setFieldValue("csv", event.target.files[0])
                            }
                            accept=".csv"
                            style={{ display: "block", margin: "10px auto" }}
                          />
                        </Col>
                        {/* <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">Notes</label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                          />
                        </Col> */}
                        {/* <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">Student Photo</label>
                          <div className="control-group form-group mb-0 drop">
                            <label className="form-label">Student Image</label>
                            <DropImg
                              type="file"
                              className="dropify"
                              imgtype="image"
                              formik={formik}
                            />
                          </div>
                        </Col> */}
                      </div>
                      <Button
                        type="submit"
                        variant="primary"
                        className="me-1 mt-5"
                      >
                        Submit
                      </Button>
                    </section>
                  </Row>
                </Card>
              </Col>
            </Card>
          </Col>
        </Row>
      </form>
    </div>
  );
}
