import React, { useEffect, useState, useRef } from "react";
import * as datatable from "../../../../data/Table/datatable/datatable";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DropImg } from "../../Property/StepForm/component/DropImg";
import { createStudentAttendence } from "../../../../redux/Action/StudentAttendenceAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { fetchStudents } from "../../../../redux/Action/StudentAction";
import { fetchSubject } from "../../../../redux/Action/SubjectAction";
import { fetchDepartment } from "../../../../redux/Action/DepartmentAction";
import { fetchStudentsAttendence } from "../../../../redux/Action/StudentAttendenceAction";
import { AddStudentAttendenceModal } from "../../../Modal/AddStudentModal";
import * as Yup from "yup";

export default function StudentAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(false);
  const [semester, setSemester] = useState(false);
  const [subject, setSubject] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [finalAttendence, setFinalAttendence] = useState([]);
  const [show, setShow] = useState(false);
  const { Courses, Semester, Subjects, StudentAttendence, Students } =
    useSelector((state) => ({
      Courses: state?.courses?.courses,
      Subjects: state?.subjects?.subjects,
      Semester: state?.semesters?.semesters,
      StudentAttendence: state?.studentsAttendence?.studentsAttendence,
      Students: state?.students?.students,
    }));
  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
    dispatch(fetchSubject());
    dispatch(fetchStudents());
  }, []);

  function extractNamesById(array, targetId) {
    return array.filter((obj) => obj._id === targetId).map((obj) => obj.name);
  }
  function extractRollNoById(array, targetId) {
    return array
      .filter((obj) => obj._id === targetId)
      .map((obj) => obj.roll_no);
  }

  useEffect(() => {
    let finalRAttendence = [];
    if (StudentAttendence.length > 0) {
      StudentAttendence.map((item) => {
        let data = {};
        const date = item.a_date;
        const course = extractNamesById(Courses, item.course_id)[0];
        const phase = extractNamesById(Semester, item.semester_id)[0];
        const student = extractNamesById(Students, item.student_id)[0];
        const subject = extractNamesById(Subjects, item.subject_id)[0];
        const studentroll = extractRollNoById(Students, item.student_id)[0];
        const attendance_status = item.attendence_status;
        const type = item.type;
        data = {
          studentroll,
          student,
          course,
          phase,
          subject,
          type,
          date,
          attendance_status,
        };
        finalRAttendence.push(data);
      });
    }
    function calculateAttendancePercentageByStudent(data) {
      const studentAttendance = {};
      data.forEach((entry) => {
        const { studentroll, student, subject, type, attendance_status } =
          entry;
        const studentKey = `${studentroll}-${student}`;
        const subjectKey = `${subject}-${type}`;
        if (!studentAttendance[studentKey]) {
          studentAttendance[studentKey] = {
            student,
            roll: studentroll,
            subjects: {},
          };
        }

        const studentData = studentAttendance[studentKey];
        if (!studentData.subjects[subjectKey]) {
          studentData.subjects[subjectKey] = { present: 0, absent: 0 };
        }

        const subjectData = studentData.subjects[subjectKey];
        if (attendance_status === "Present") {
          subjectData.present++;
        } else {
          subjectData.absent++;
        }
      });

      // Calculate percentage for each subject within each student
      for (const studentKey in studentAttendance) {
        const studentData = studentAttendance[studentKey];
        for (const subjectKey in studentData.subjects) {
          const subjectData = studentData.subjects[subjectKey];
          const total = subjectData.present + subjectData.absent;
          subjectData.percentage =
            total === 0
              ? "N/A"
              : ((subjectData.present / total) * 100).toFixed(1) + "%";
        }
      }

      return studentAttendance;
    }
    const attendanceByType =
      calculateAttendancePercentageByStudent(finalRAttendence);

    function ObjectToArray(data) {
      const studentArray = [];

      // Loop through object keys (student IDs)
      for (const studentId in data) {
        const studentData = data[studentId]; // Get student object for current ID
        const student = {
          id: studentId.split("-")[0], // Extract ID (assuming format "123-Student1")
          name: studentData.student,
          roll: studentData.roll,
          subjects: [], // Initialize subjects array for current student
        };

        // Loop through student's subjects object
        for (const subjectName in studentData.subjects) {
          const subjectData = studentData.subjects[subjectName];
          student.subjects.push({
            name: subjectName,
            present: subjectData.present,
            absent: subjectData.absent,
            percentage: subjectData.percentage,
          });
        }

        studentArray.push(student); // Add student object to the final array
      }

      return studentArray;
    }
    const studentArray = ObjectToArray(attendanceByType);

    function DuplicateFirstSubject(studentData) {
      if (!studentData || studentData.length === 0) {
        return studentData; // Handle empty or invalid data
      }

      const firstStudent = studentData[0]; // Get the first student object
      const firstSubject = firstStudent.subjects[0]; // Get the first subject of the first student

      const duplicatedSubject = {
        ...firstSubject, // Copy all properties from the first subject
      };

      // Add the duplicated subject to the first student's subjects array
      firstStudent.subjects.push(duplicatedSubject);

      return studentData; // Return the modified student data array
    }
    const modifiedArray = DuplicateFirstSubject(studentArray);

    function extractSubjectDetails(data) {
      const results = [];
      for (const subject of data.subjects) {
        const subjectWithKeys = { ...subject }; // Spread subject object
        for (const key in subject) {
          // Combine subject key and value
          subjectWithKeys[key] = subject[key];
        }

        // Add outer object properties without prefix
        subjectWithKeys.id = data.id;
        subjectWithKeys.studentName = data.name; // Assuming "name" holds student name
        subjectWithKeys.roll = data.roll; // Add other relevant outer object properties

        results.push(subjectWithKeys);
      }
      return results;
    }
    let finalAttendenceArray = [];
    modifiedArray.map((item) => {
      const combinedResults = extractSubjectDetails(item);
      const id = item.a_date;
      finalAttendenceArray.push(...combinedResults);
    });
    const uniqueData = finalAttendenceArray.reduce((acc, current) => {
      // Check if any existing object in 'acc' has all the same properties as 'current'
      const isDuplicate = acc.some((obj) =>
        Object.keys(current).every((key) => current[key] === obj[key])
      );
      return !isDuplicate ? [...acc, current] : acc; // Add only if not a duplicate
    }, []);
    setFinalAttendence(uniqueData);
  }, [StudentAttendence]);
  const SignupSchema = Yup.object().shape({
    course_id: Yup.string().required("*Required"),
    endDate: Yup.string().required("*Required"),
    fromdate: Yup.string().required("*Required"),
  });
  const formik = useFormik({
    initialValues: {
      course_id: "",
      semester_id: "",
      type: "",
      subject_id: "",
      endDate: "",
      fromdate: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(fetchStudentsAttendence(values));
    },
  });
  useEffect(() => {
    if (formik.values.course_id.length > 0) {
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
    if (formik.values.semester_id.length > 0) {
      setSemester(true);
    } else {
      formik.values.type = "";
      formik.values.subject_id = "";
      setSemester(false);
      setSubject(false);
    }
  }, [formik.values.semester_id]);

  useEffect(() => {
    if (formik.values.subject_id.length > 0) {
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
      course: "Course",
      phase: "Phase",
      subject: "Subject",
      type: "Type",
      date: "Date",
      attendance_status: "Attendence Status",
    };
    const newArray = [header, ...finalAttendence];
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
  return (
    <div>
      <AddStudentAttendenceModal
        setShow={setShow}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <form onSubmit={formik.handleSubmit}>
        <Row className="row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h3">Filter Student Attendance</Card.Title>
                <button
                  onClick={() => handleShow()}
                  className="btn btn-primary"
                >
                  Add Attendence
                </button>
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
                      {course ? (
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
                          {/* {formik.errors.course && formik.touched.course ? (
                            <div className="red_color">
                              {formik.errors.course}
                            </div>
                          ) : null} */}
                        </Col>
                      ) : (
                        ""
                      )}
                      {semester ? (
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Subject</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.subject_id}
                            className="form-control required"
                            name="subject_id"
                            id="subject_id"
                          >
                            <option value="">Please Select Subject</option>
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
                          {/* {formik.errors.course && formik.touched.course ? (
                            <div className="red_color">
                              {formik.errors.course}
                            </div>
                          ) : null} */}
                        </Col>
                      ) : (
                        ""
                      )}

                      {subject ? (
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Type</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            className="form-control required"
                            name="type"
                            id="type"
                          >
                            <option value="">Please Select Type</option>
                            <option value="Theory">Theory</option>
                            <option value="Clinical">Clinical</option>
                            <option value="Practical">Practical</option>
                            <option value="Others">Others</option>
                          </select>
                        </Col>
                      ) : (
                        ""
                      )}
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
                        {formik.errors.endDate ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.endDate}
                          </div>
                        ) : null}
                      </Col>
                    </div>
                    <div className="d-flex justify-content-start">
                      <Button
                        type="submit"
                        variant="primary"
                        className="me-1 mt-5"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="me-1 mt-5"
                        onClick={formik.resetForm}
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
      {finalAttendence?.length > 0 ? (
        <div className="table-responsive">
          <Card>
            <Card.Header>
              <div className="w-100 d-flex justify-content-end">
                <button onClick={exportCSV} className="btn btn-warning">
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
