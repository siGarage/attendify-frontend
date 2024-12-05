import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { updateStudent } from "../../../../redux/Action/StudentAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

export default function TeacherAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const params = useParams();
  const { Courses, Semester, students } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semester: state?.semesters?.semesters,
    students: state?.students?.students?.filter(
      (item) => item?._id == params?.id
    ),
  }));
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("*Required"),
    phone_no: Yup.number().required("*Required"),
    gender: Yup.string().required("*Required"),
    roll_no: Yup.number().required("*Required"),
    batch: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    course_id: Yup.string().required("*Required"),
    father_name: Yup.string().required("*Required"),
    guardian_no: Yup.number(),
    current_address: Yup.string().required("*Required"),
    permanent_address: Yup.string().required("*Required"),
    email: Yup.string().email("Invalid email").required("*Required"),
  });
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: students[0]?.name || "",
      guardian_no: students[0]?.guardian_no || "",
      father_name: students[0]?.father_name || "",
      email: students[0]?.email || "",
      semester_id: students[0]?.semester_id || "",
      course_id: students[0]?.course_id || "",
      gender: students[0]?.gender || "",
      dob: students[0]?.dob || "",
      batch: students[0]?.batch || "",
      roll_no: students[0]?.roll_no || "",
      phone_no: students[0]?.phone_no || "",
      permanent_address: students[0]?.permanent_address || "",
      current_address: students[0]?.current_address || "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = { ...values, id: params?.id };
      dispatch(updateStudent(values));
      navigate("/student-list");
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Update Student</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Name"
                            className="form-control required"
                          />
                          {formik.errors.name ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Gender</label>
                          <Form.Select
                            name="gender"
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                          >
                            <option>Please Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Select>
                          {formik.errors.gender ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.gender}
                            </div>
                          ) : null}
                        </Col>

                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Date Of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            onChange={formik.handleChange}
                            value={formik.values.dob}
                            placeholder="Date of Birth"
                            className="form-control required"
                          />
                          {formik.errors.dob ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.dob}
                            </div>
                          ) : null}
                        </Col>

                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Batch</label>
                          <input
                            type="text"
                            name="batch"
                            onChange={formik.handleChange}
                            value={formik.values.batch}
                            placeholder="Batch"
                            className="form-control required"
                          />
                          {formik.errors.batch ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.batch}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Roll no</label>
                          <input
                            type="text"
                            name="roll_no"
                            onChange={formik.handleChange}
                            value={formik.values.roll_no}
                            placeholder="Roll Number"
                            className="form-control required"
                          />
                          {formik.errors.roll_no ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.roll_no}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">E-mail</label>
                          <input
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="E-mail"
                            className="form-control required"
                          />
                          {formik.errors.email ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Father Name</label>
                          <input
                            type="text"
                            name="father_name"
                            onChange={formik.handleChange}
                            value={formik.values.father_name}
                            placeholder="Father Name"
                            className="form-control required"
                          />
                          {formik.errors.father_name ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.father_name}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <input
                              type="number"
                              name="phone_no"
                              onChange={formik.handleChange}
                              value={formik.values.phone_no}
                              placeholder="Phone Number"
                              className="form-control required"
                            />
                          </Form.Group>
                          {formik.errors.phone_no ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.phone_no}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <Form.Group>
                            <Form.Label>Guardian Number</Form.Label>
                            <input
                              type="number"
                              name="guardian_no"
                              onChange={formik.handleChange}
                              value={formik.values.guardian_no}
                              placeholder="Alternate Number"
                              className="form-control required"
                            />
                          </Form.Group>
                          {formik.errors.guardian_no ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.guardian_no}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Current Address</label>
                          <input
                            type="text"
                            name="current_address"
                            onChange={formik.handleChange}
                            value={formik.values.current_address}
                            placeholder="Current Address"
                            className="form-control required"
                          />
                          {formik.errors.current_address ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.current_address}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">
                            Permanent Address
                          </label>
                          <input
                            type="text"
                            name="permanent_address"
                            onChange={formik.handleChange}
                            value={formik.values.permanent_address}
                            placeholder="Permanent Address"
                            className="form-control required"
                          />
                          {formik.errors.permanent_address ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.permanent_address}
                            </div>
                          ) : null}
                        </Col>
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
                          {formik.errors.course_id &&
                          formik.touched.course_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.semester_id}
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
                              ? Semester?.map((course) => {
                                  return (
                                    <option value={course?._id}>
                                      {course?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.semester_id &&
                          formik.touched.semester_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.semester_id}
                            </div>
                          ) : null}
                        </Col>
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
