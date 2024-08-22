import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchDepartment,
  updateDepartment,
} from "../../../../redux/Action/DepartmentAction";
import JoditEditor from "jodit-react";
import { fetchTeachers } from "../../../../redux/Action/TeacherAction";
export default function CourseAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const params = useParams();
  const { teachers, Departments } = useSelector((state) => ({
    teachers: state?.teachers?.teachers,
    Departments: state?.departments?.departments?.filter(
      (item) => item?._id == params?.id
    ),
  }));
  const [content, setContent] = useState(Departments[0]?.notes || "");
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDepartment());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: Departments[0]?.name || "",
      hod: Departments[0]?.hod || "",
    },
    onSubmit: (values) => {
      let _id = params?.id;
      values = { ...values, id: _id, notes: content };
      dispatch(updateDepartment(values));
      navigate("/department-list");
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Department</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Name"
                            className="form-control required"
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">
                            Head Of Department
                          </label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.hod}
                            className="form-control required"
                            name="hod"
                          >
                            <option>Please Select HOD</option>
                            {teachers?.length > 0
                              ? teachers?.map((teacher) => {
                                  return (
                                    <option value={teacher?._id}>
                                      {teacher?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.hod && formik.touched.hod ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.hod}
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
