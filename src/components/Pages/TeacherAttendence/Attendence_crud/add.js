import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DropImg } from "../../Property/StepForm/component/DropImg";
import { createTeacherAttendence } from "../../../../redux/Action/TeacherAttendenceAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { fetchStudents } from "../../../../redux/Action/StudentAction";
import { fetchTeachers } from "../../../../redux/Action/TeacherAction";
import { fetchSubject } from "../../../../redux/Action/SubjectAction";
import * as Yup from "yup";
import moment from "moment";

export default function TeacherAttendenceAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Courses, Semester, Subjects, Teachers } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Subjects: state?.subjects?.subjects,
    Semester: state?.semesters?.semesters,
    Teachers: state?.teachers?.teachers,
  }));
  const SignupSchema = Yup.object().shape({
    teacher_id: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    course_id: Yup.string().required("*Required"),
    subject_id: Yup.string().required("*Required"),
    attendence_status: Yup.string().required("*Required"),
    type: Yup.string().required("*Required"),
    department_id: Yup.string().required("*Required"),
  });
  useEffect(() => {
    if (Semester?.length == 0) {
      dispatch(fetchSemester());
    }
    if (Teachers?.length == 0) {
      dispatch(fetchTeachers());
    }
    if (Courses?.length == 0) {
      dispatch(fetchCourse());
    }
    if (Subjects?.length == 0) {
      dispatch(fetchSubject());
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      teacher_id: "",
      semester_id: "",
      course_id: "",
      subject_id: "",
      attendence_status: "",
      department_id: "",
      type: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        date: moment(),
      };
      dispatch(createTeacherAttendence(values));
      navigate("/teacher-attendence-list");
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Teacher Attendence</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Teacher</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.teacher_id}
                            className="form-control required"
                            name="teacher_id"
                          >
                            <option>Please Select Teacher</option>
                            {Teachers?.length > 0
                              ? Teachers?.map((teacher) => {
                                  return (
                                    <option value={teacher?._id}>
                                      {teacher?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.teacher_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.teacher_id}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Department Id</label>
                          <input
                            type="number"
                            name="department_id"
                            onChange={formik.handleChange}
                            value={formik.values.department_id}
                            placeholder="Department Id"
                            className="form-control required"
                          />
                          {formik.errors.department_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.department_id}
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
                          {formik.errors.course_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.course_id}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Semester</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.semester_id}
                            className="form-control required"
                            name="semester_id"
                          >
                            <option>Please Select Semester</option>
                            {Semester?.length > 0
                              ? Semester?.map((semester) => {
                                  return (
                                    <option value={semester?._id}>
                                      {semester?.number}
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

                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Subject</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.subject_id}
                            className="form-control required"
                            name="subject_id"
                          >
                            <option>Please Select Subject</option>
                            {Subjects?.length > 0
                              ? Subjects?.map((subject) => {
                                  return (
                                    <option value={subject?._id}>
                                      {subject?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.subject_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.subject_id}
                            </div>
                          ) : null}
                        </Col>

                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Type</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            className="form-control required"
                            name="type"
                          >
                            <option value="">Please Select Type</option>
                            <option value="Theory">Theory</option>
                            <option value="Practical">Practical</option>
                          </select>
                          {formik.errors.type ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.type}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">
                            Attendence Status
                          </label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.attendence_status}
                            className="form-control required"
                            name="attendence_status"
                          >
                            <option value="">Please Select Teacher</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                          {formik.errors.attendence_status ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.attendence_status}
                            </div>
                          ) : null}
                        </Col>
                        {/* <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            placeholder="Date"
                            className="form-control required"
                          />
                          {formik.errors.date ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.date}
                            </div>
                          ) : null}
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
