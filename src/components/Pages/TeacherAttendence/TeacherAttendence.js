import React, { useEffect, useState, useRef } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { useFormik } from "formik";
import "../../../App.css";
import { Col, Row, Card, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCourse } from "../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../redux/Action/SemesterAction";
import { fetchStudents } from "../../../redux/Action/StudentAction";
import { fetchTeachers } from "../../../redux/Action/TeacherAction";
import { fetchSubject } from "../../../redux/Action/SubjectAction";
import { fetchTeachersAttendence } from "../../../redux/Action/TeacherAttendenceAction";
import file from "../../../assets/add_student_attendance.csv";
import * as Yup from "yup";

export default function TeacherAttendanceList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [semester, setSemester] = useState(false);
  const [subject, setSubject] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [attendanceData, setAttendanceData] = useState([]);
  const [show, setShow] = useState(false);
  const { Courses, Semester, TeacherAttendance, Teachers } = useSelector(
    (state) => ({
      Courses: state?.courses?.courses,
      Subjects: state?.subjects?.subjects,
      Semester: state?.semesters?.semesters,
      TeacherAttendance: state?.teachersAttendence?.teachersAttendence,
      Teachers: state?.teachers?.teachers,
    })
  );
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
    dispatch(fetchSubject());
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
    dispatch(fetchTeachersAttendence());
  }, []);

  useEffect(() => {
    if (
      sessionStorage.getItem("role") == "2" &&
      Teachers.length > 0 &&
      TeacherAttendance.length > 0
    ) {
      console.log("kartik");
      let departmentId = Teachers?.filter(
        (t) => t.user_id == sessionStorage.getItem("userId")
      );
      console.log("kartik2");
      let FinalTeacherAttendance = TeacherAttendance?.filter((ta) =>
        console.log(ta);
      );
      console.log("kartik3");
      console.log(FinalTeacherAttendance);
      if (FinalTeacherAttendance?.length > 0) {
        console.log("kartik4");
        const processedData = FinalTeacherAttendance.reduce((acc, item) => {
          const existingEntry = acc.find(
            (entry) => entry.name === item.name && entry.emp_id === item.emp_id
          );
          if (existingEntry) {
            existingEntry.attendanceCount++;
          } else {
            acc.push({
              name: item.name,
              emp_id: item.emp_id,
              attendanceCount:
                item._doc.attendance_status === "Present" ? 1 : 0,
            });
          }
          return acc;
        }, []);

        const mergedData = Teachers.reduce((acc, faculty) => {
          const attendance = processedData.find(
            (a) => a.emp_id === faculty.emp_id
          );
          const combined = attendance
            ? { ...attendance }
            : {
                emp_id: faculty.emp_id,
                name: faculty.name,
                attendanceCount: 0,
              };
          acc.push(combined);
          return acc;
        }, []);
        setAttendanceData(mergedData);
      }
    } else {
      if (TeacherAttendance?.length > 0) {
        const processedData = TeacherAttendance.reduce((acc, item) => {
          const existingEntry = acc.find(
            (entry) => entry.name === item.name && entry.emp_id === item.emp_id
          );
          if (existingEntry) {
            existingEntry.attendanceCount++;
          } else {
            acc.push({
              name: item.name,
              emp_id: item.emp_id,
              attendanceCount:
                item._doc.attendance_status === "Present" ? 1 : 0,
            });
          }
          return acc;
        }, []);

        const mergedData = Teachers.reduce((acc, faculty) => {
          const attendance = processedData.find(
            (a) => a.emp_id === faculty.emp_id
          );
          const combined = attendance
            ? { ...attendance }
            : {
                emp_id: faculty.emp_id,
                name: faculty.name,
                attendanceCount: 0,
              };
          acc.push(combined);
          return acc;
        }, []);
        setAttendanceData(mergedData);
      }
    }
    setIsDisabled(false);
  }, [TeacherAttendance]);
  const SignupSchema = Yup.object().shape({
    course_id: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    // subject_id: Yup.string().required("*Required"),
    // endDate: Yup.string().required("*Required"),
    // fromdate: Yup.string().required("*Required"),
  });
  const formik = useFormik({
    initialValues: {
      course_id: "",
      semester_id: "",
      // endDate: "",
      // fromdate: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // setFromDate(values.fromdate);
      // setToDate(values.endDate);
      setIsDisabled(true);
      setAttendanceData([]);
      dispatch(fetchTeachersAttendence(values));
      // dispatch(fetchStudentsAttendence(values));
    },
  });
  useEffect(() => {
    if (formik.values.course_id?.length > 0) {
      setCourse(true);
    } else {
      formik.values.semester_id = "";
      formik.values.subject_id = "";
      formik.values.type = "";
      setCourse(false);
      setSemester(false);
      setSubject(false);
    }
  }, [formik.values.course_id]);

  useEffect(() => {
    if (formik.values.semester_id?.length > 0) {
      setSemester(true);
    } else {
      formik.values.type = "";
      formik.values.subject_id = "";
      setSemester(false);
      setSubject(false);
    }
  }, [formik.values.semester_id]);

  useEffect(() => {
    if (formik.values.subject_id?.length > 0) {
      setSubject(true);
    } else {
      formik.values.type = "";
      setSubject(false);
    }
  }, [formik.values.subject_id]);
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const exportCSV = () => {
    // Convert data to CSV format
    const header = {
      id: "Roll No",
      student: "Name",
      theory_P: "Theory_P",
      theory_A: "Theory_A",
      theory_Pre: "Theory_Pre",
      practical_P: "Practical_P",
      practical_A: "Practical_A",
      practical_Pre: "Practical_Pre",
      ece_P: "Ece_P",
      ece_A: "Ece_A",
      ece_Pre: "Ece_Pre",
      Aetcom_P: "Aetcom_P",
      Aetcom_A: "Aetcom_A",
      Aetcom_Pre: "Aetcom_Pre",
      Fap_P: "Fap_P",
      Fap_A: "Fap_A",
      Fap_Pre: "Fap_Pre",
    };
    const transformSubjects = attendanceData.map((student, index) => {
      let transformed = {
        id: index + 1,
        name: student.name,
        roll: student.roll,
      };
      student.subjects.forEach((subject) => {
        const subjectKey = subject.name.split("-")[1]; // Extracting key like 'Practical', 'Ece', etc.
        transformed[`${subjectKey}-P`] = subject.present;
        transformed[`${subjectKey}-A`] = subject.absent;
        transformed[`${subjectKey}-Pre`] = subject.percentage;
      });
      return transformed;
    });

    // Extract the subjects dynamically from the first student in transformSubjects
    const subjects = Object.keys(transformSubjects[0]).filter(
      (key) => key !== "id" && key !== "name" && key !== "roll"
    );

    // Function to filter the header based on subjects
    const filteredHeader = Object.keys(header).reduce((filtered, key) => {
      const subjectName = key.split("_")[0]; // Extracts subject name before the underscore (e.g., 'theory' from 'theory_P')

      if (
        subjects.some((sub) =>
          sub?.toLowerCase().includes(subjectName?.toLowerCase())
        )
      ) {
        filtered[key] = header[key];
      }
      return filtered;
    }, {});

    const newArray = [
      {
        id: "S no.",
        student: "Name",
        roll: "Roll No",
        ...filteredHeader,
      },
      ...transformSubjects,
    ];
    const csv = newArray.map((row) => Object.values(row).join(",")).join("\n");
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
  const handleDownloadClick = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = file;
    link.download = "add_stundent_attendance.csv"; // Replace with your desired filename
    link.click();
  };
  return (
    <div>
      {/* <AddStudentAttendenceModal
        setShow={setShow}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      /> */}
      <form onSubmit={formik.handleSubmit}>
        <Row className="row-sm mt-3">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title className="h3">
                  Filter Teacher Attendance
                </Card.Title>
                <div className="d-flex">
                  <button
                    onClick={() => handleDownloadClick()}
                    className="btn btn-primary me-2"
                  >
                    Download CSV template
                  </button>
                  {/* <button
                    onClick={() => handleShow()}
                    className="btn btn-primary me-2"
                  >
                    Add Attendance
                  </button> */}
                </div>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card className="removeShadow">
                  <Row>
                    <div className="row">
                      <Col sm={12} lg={3} md={3} xl={3}>
                        <label className="form-label">Course</label>
                        <select
                          onChange={formik.handleChange}
                          value={formik.values.course_id}
                          className="form-control required"
                          name="course_id"
                          id="course_id"
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
                          id="semester_id"
                        >
                          <option value="">Please Select Phase</option>
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
                        {formik.errors.semester_id &&
                        formik.touched.semester_id ? (
                          <div className="red_color">
                            {formik.errors.semester_id}
                          </div>
                        ) : null}
                      </Col>
                      {/* <Col sm={12} lg={3} md={3} xl={3}>
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
                        {formik.errors.endDate ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.endDate}
                          </div>
                        ) : null}
                      </Col> */}
                    </div>
                    <div className="d-flex justify-content-start">
                      {isDisabled ? (
                        <Button
                          type="submit"
                          variant="primary"
                          className="me-1 mt-5"
                          disabled
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          className="me-1 mt-5"
                        >
                          Submit
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="danger"
                        className="me-1 mt-5"
                        onClick={() => {
                          formik.resetForm();
                          setAttendanceData([]);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </Row>
                </Card>
              </Col>
            </Card>
          </Col>
        </Row>
      </form>
      {attendanceData?.length > 0 ? (
        <div className="table-responsive">
          <Card>
            <Card.Header>
              <div className="w-100 d-flex justify-content-between">
                <button onClick={exportCSV} className="btn btn-primary h-50">
                  Export as CSV
                </button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.TeacherAttendenceDataTables
                  StudentAttendece={attendanceData}
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
