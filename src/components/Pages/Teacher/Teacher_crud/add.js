import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DropImg } from "../../Property/StepForm/component/DropImg";
import { createTeacher } from "../../../../redux/Action/TeacherAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

export default function TeacherAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { Courses, Semester } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semester: state?.semesters?.semesters,
  }));
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("*Required"),
    father_name: Yup.string().required("*Required"),
    phone_no: Yup.number().required("*Required"),
    alternate_no: Yup.number(),
    current_address: Yup.string().required("*Required"),
    permanent_address: Yup.string().required("*Required"),
    department_id: Yup.string().required("*Required"),
    designation: Yup.string().required("*Required"),
    email: Yup.string().email("Invalid email").required("*Required"),
    phone_no: Yup.number().required("*Required"),
  });
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      department_id: "",
      father_name: "",
      alternate_no: "",
      email: "",
      semester_id: "",
      designation: "",
      gender: "",
      dob: "",
      permanent_address: "",
      current_address: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        notes: content,
      };
      if (typeof values.image == "object") {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(createTeacher(formData));
        navigate("/teacher-list");
      } else {
        dispatch(createTeacher(values));
        navigate("/teacher-list");
      }
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
                          <label className="form-label">Employee Id</label>
                          <input
                            type="number"
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
                            <Form.Label>Alternate Number</Form.Label>
                            <input
                              type="number"
                              name="alternate_no"
                              onChange={formik.handleChange}
                              value={formik.values.guardian_no}
                              placeholder="Alternate Number"
                              className="form-control required"
                            />
                          </Form.Group>
                          {formik.errors.alternate_no ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.alternate_no}
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
                          <label className="form-label">Designation</label>
                          <input
                            type="text"
                            name="designation"
                            onChange={formik.handleChange}
                            value={formik.values.designation}
                            placeholder="Designation"
                            className="form-control required"
                          />
                          {formik.errors.designation ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.designation}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">Notes</label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                          />
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">Teacher Photo</label>
                          <div className="control-group form-group mb-0 drop">
                            <label className="form-label">Teacher Image</label>
                            <DropImg
                              type="file"
                              className="dropify"
                              imgtype="image"
                              formik={formik}
                            />
                          </div>
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
