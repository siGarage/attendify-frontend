import React, { useEffect, useState, useRef } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { useFormik } from "formik";
import "../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCourse } from "../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../redux/Action/SemesterAction";
import { fetchStudents } from "../../../redux/Action/StudentAction";
import { fetchSubject } from "../../../redux/Action/SubjectAction";
import { fetchDepartment } from "../../../redux/Action/DepartmentAction";
import { fetchStudentsAttendence } from "../../../redux/Action/StudentAttendenceAction";
import Papa from "papaparse";

export default function StudentAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [finalAttendence, setFinalAttendence] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [show, setShow] = useState(false);
  const {
    Courses,
    Semester,
    Subjects,
    Students,
    studentAttendence,
    Departments,
  } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Subjects: state?.subjects?.subjects,
    Semester: state?.semesters?.semesters,
    Students: state?.students?.students,
    studentAttendence: state?.studentsAttendence?.studentsAttendence,
    Departments: state?.departments?.departments,
  }));
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
    dispatch(fetchStudents());
    dispatch(fetchSubject());
    dispatch(fetchDepartment());
    if (studentAttendence.length === 0) {
      dispatch(fetchStudentsAttendence());
    }
  }, []);
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      course: "",
      department: "",
      student: "",
      subject: "",
      from: "",
      end: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const exportCSV = () => {
    // Convert data to CSV format
    const csv = finalAttendence
      .map((row) => Object.values(row).join(","))
      .join("\n");

    // Create a download link and trigger click
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Filter Student Attendance</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">CSV Upload</label>
                          <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            accept=".csv"
                            style={{ display: "block", margin: "10px auto" }}
                          />
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Course</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.course}
                            className="form-control required"
                            name="department"
                            id="department"
                          >
                            <option value="">Please Select Course</option>
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
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Course</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.course}
                            className="form-control required"
                            name="course"
                            id="course"
                          >
                            <option value="">Please Select Course</option>
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
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">From</label>
                          <input
                            type="date"
                            name="fromdate"
                            id="fromdate"
                            onChange={formik.handleChange}
                            value={formik.values.fromdate}
                            placeholder="Date"
                            className="form-control required"
                          />
                          {formik.errors.fromdate ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.fromdate}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">End</label>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            onChange={formik.handleChange}
                            value={formik.values.endDate}
                            placeholder="Date"
                            className="form-control required"
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
      {finalAttendence?.length > 0 ? (
        <div className="table-responsive">
          <Card>
            <Card.Header>
              <div className="w-100 d-flex justify-content-end">
                <button onClick={exportCSV} className="btn btn-primary">
                  Export as CSV
                </button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.StudentAttendenceDataTables
                  StudentAttendece={finalAttendence}
                  handleShow={handleShow}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <p> "There is no record to display"</p>
      )}
    </div>
  );
}
