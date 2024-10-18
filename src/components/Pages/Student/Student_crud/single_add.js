import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { createStudent } from "../../../../redux/Action/StudentAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { Form } from "react-bootstrap";
import * as Yup from "yup";

export default function TeacherAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [course, setCourse] = useState("");
  const [parmamentAd, setParmanentAd] = useState("");
  const [finalPhase, setFinalPhase] = useState([]);
  const [spracticalPermission, setPracticalPermission] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { Courses, Semester } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semester: state?.semesters?.semesters,
  }));
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("*Required"),
    guardian_no: Yup.string().phone("*Invalid number").required("*Required"),
    gender: Yup.string().required("*Required"),
    dob: Yup.string().required("*Required"),
    father_name: Yup.string().required("*Required"),
    current_address: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    course_id: Yup.string().required("*Required"),
    email: Yup.string().email("*Invalid email").required("*Required"),
    phone_no: Yup.string().phone("*Invalid number").required("*Required"),
    roll_no: Yup.number().required("*Required"),
    permanent_address: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Permanent address is required"),
    }),
  });

  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      guardian_no: "",
      email: "",
      semester_id: "",
      permanent_address: "",
      phone_no: "",
      course_id: "",
      gender: "",
      dob: "",
      father_name:"",
      current_address: "",
      roll_no: "",
      isSameAddress: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (values.isSameAddress) {
        let data = {
          name: values.name,
          guardian_no: values.guardian_no,
          email: values.email,
          course_id: values.course_id,
          semester_id: values.semester_id,
          gender: values.gender,
          phone_no: values.phone_no,
          father_name:values.father_name,
          dob: values.dob,
          current_address: values.current_address,
          permanent_address: values.current_address,
          roll_no: values.roll_no,
          role: "4",
        };
        dispatch(createStudent(data));
        navigate("/student-list");
      } else {
        values = { ...values, role: "4" };
        dispatch(createStudent(values));
        navigate("/student-list");
      }
    },
  });
  useEffect(() => {
    let finalPhaseData = Semester?.filter(
      (p) => p.course_id === formik.values.course_id
    );
    setFinalPhase([...finalPhaseData]);
  }, [formik.values.course_id]);
  // const samepermanentAdd = (event) => {
  //   const newValue = event.target.value;
  //   console.log(newValue);
  // };
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
                          <label className="form-label">Roll No</label>
                          <input
                            type="number"
                            name="roll_no"
                            onChange={formik.handleChange}
                            value={formik.values.roll_no}
                            placeholder="Roll no"
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
                              placeholder="Guardian Number"
                              className="form-control required"
                            />
                          </Form.Group>
                          {formik.errors.guardian_no ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.guardian_no}
                            </div>
                          ) : null}
                        </Col>

                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Course </label>
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
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Semester </label>
                          {/* <input
                            type="number"
                            name="semester_id"
                            onChange={formik.handleChange}
                            value={formik.values.semester_id}
                            placeholder="Department Id"
                            className="form-control required"
                          /> */}
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.semester_id}
                            className="form-control required"
                            name="semester_id"
                          >
                            <option>Please Select Phase</option>
                            {finalPhase?.length > 0
                              ? finalPhase?.map((course) => {
                                  return (
                                    <option value={course?._id}>
                                      {course?.name}
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
                        <Col sm={12} lg={5} md={5} xl={5}>
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
                        <Col sm={12} lg={5} md={5} xl={5}>
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
                        <Col sm={12} lg={2} md={2} xl={2}>
                          <label className="form-label">
                            (Same as Current Address)
                          </label>
                          <input
                            type="checkbox"
                            id="isSameAddress"
                            name="isSameAddress"
                            checked={formik.values.isSameAddress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {/* <ReactSwitch
                            checked={spracticalPermission}
                            onChange={handleSetPrcaticalPermission}
                          /> */}
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
