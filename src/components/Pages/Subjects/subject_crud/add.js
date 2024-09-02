import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { createSubject } from "../../../../redux/Action/SubjectAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";
export default function SubjectAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [stheoryPermission, setTheoryPermission] = useState(false);
  const [spracticalPermission, setPracticalPermission] = useState(false);
  const [secePermission, setEcePermission] = useState(false);
  const [saetcomPermission, setAetcomPermission] = useState(false);
  const [sfapPermission, setFapPermission] = useState(false);
  const [sclinicalsPermission, setClinicalPermission] = useState(false);
  const { Semester } = useSelector((state) => ({
    Semester: state?.semesters?.semesters,
  }));
  useEffect(() => {
    dispatch(fetchSemester());
  }, []);
  const handleSetTheoryPermission = (val) => {
    setTheoryPermission(val);
  };
  const handleSetPrcaticalPermission = (val) => {
    setPracticalPermission(val);
  };
  const handleSetEcePermission = (val) => {
    setEcePermission(val);
  };
  const handleSetAetcomPermission = (val) => {
    setAetcomPermission(val);
  };
  const handleSetFapPermission = (val) => {
    setFapPermission(val);
  };
  const handleSetClinicalsPermission = (val) => {
    setClinicalPermission(val);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "active",
      elective: false,
      semester_id: "",
    },
    onSubmit: (values) => {
      values = {
        ...values,
        description: content,
        theory: stheoryPermission,
        practical: spracticalPermission,
        ece: secePermission,
        aetcom: saetcomPermission,
        fap: sfapPermission,
        clinical: sclinicalsPermission,
      };
      dispatch(createSubject(values));
      navigate("/subject-list");
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Subject</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={4} md={4} xl={4}>
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
                        <Col
                          sm={12}
                          lg={4}
                          md={4}
                          xl={4}
                          style={{ display: "none" }}
                        >
                          <label className="form-label">Status</label>
                          <Form.Select
                            name="status"
                            onChange={formik.handleChange}
                          >
                            <option>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inative">InActive</option>
                          </Form.Select>
                          {formik.errors.status && formik.touched.status ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.status}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={4} md={4} xl={4}>
                          <label className="form-label">Elective</label>
                          <Form.Select
                            name="elective"
                            onChange={formik.handleChange}
                          >
                            <option>Please Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Form.Select>
                          {formik.errors.elective && formik.touched.elective ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.elective}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={4} md={4} xl={4}>
                          <label className="form-label">Course</label>
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
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">
                            Type of Subject
                          </label>
                          <table className="w-100 mt-3">
                            <tr>
                              <th>Theory</th>
                              <th>Practical</th>
                              <th>Clinicals</th>
                              <th>Ece</th>
                              <th>Aetcom</th>
                              <th>Fap</th>
                            </tr>
                            <tr>
                              <td>
                                <ReactSwitch
                                  checked={stheoryPermission}
                                  onChange={handleSetTheoryPermission}
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={spracticalPermission}
                                  onChange={handleSetPrcaticalPermission}
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={sclinicalsPermission}
                                  onChange={handleSetClinicalsPermission}
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={secePermission}
                                  onChange={handleSetEcePermission}
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={saetcomPermission}
                                  onChange={handleSetAetcomPermission}
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={sfapPermission}
                                  onChange={handleSetFapPermission}
                                />
                              </td>
                            </tr>
                          </table>
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">
                            Subject Description
                          </label>
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
