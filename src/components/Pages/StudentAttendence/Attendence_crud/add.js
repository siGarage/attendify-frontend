import React, { useEffect, useState, useRef } from "react";
import * as datatable from "../../../../data/Table/datatable/datatable";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { fetchSemester } from "../../../../redux/Action/SemesterAction";
import { fetchStudents } from "../../../../redux/Action/StudentAction";
import { fetchSubject } from "../../../../redux/Action/SubjectAction";
import { fetchStudentsAttendence } from "../../../../redux/Action/StudentAttendenceAction";
import { AddStudentAttendenceModal } from "../../../Modal/AddStudentModal";
import file from "../../../../assets/add_student_attendance.csv";
import * as Yup from "yup";

export default function StudentAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState("");
  const [finalPhase, setFinalPhase] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [semester, setSemester] = useState("");
  const [finalSubject, setFinalSubjects] = useState([]);
  const [subject, setSubject] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
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
    if (StudentAttendence.length > 0 && Students.length > 0) {
      StudentAttendence?.map((item) => {
        let data = {};
        const date = item.a_date;
        const course = extractNamesById(Courses, item?.course_id)[0];
        const phase = extractNamesById(Semester, item?.semester_id)[0];
        const student = extractNamesById(Students, item?.student_id)[0];
        const subject = extractNamesById(Subjects, item?.subject_id)[0];
        const studentroll = extractRollNoById(Students, item?.student_id)[0];
        const attendance_status = item?.attendance_status;
        const type = item?.type;
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

      function calculateAttendancePercentageByStudent(data) {
        const studentAttendance = {};
        data?.forEach((entry) => {
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
            const nameSet = new Set(student.subjects.map((item) => item.name));
            if (!nameSet.has(subjectName)) {
              student.subjects.push({
                name: subjectName,
                present: subjectData.present,
                absent: subjectData.absent,
                percentage: subjectData.percentage,
              });
            }
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
      setFinalAttendence(modifiedArray);

      // const uniqueData = finalAttendenceArray.reduce((acc, current) => {
      //   // Check if any existing object in 'acc' has all the same properties as 'current'
      //   const isDuplicate = acc.some((obj) =>
      //     Object.keys(current).every((key) => current[key] === obj[key])
      //   );
      //   return !isDuplicate ? [...acc, current] : acc; // Add only if not a duplicate
      // }, []);

      // setFinalAttendence(uniqueData);
      setIsDisabled(false);
    } else {
      dispatch(fetchCourse());
      dispatch(fetchSemester());
      dispatch(fetchSubject());
      dispatch(fetchStudents());
    }
  }, [StudentAttendence, Students]);
  const SignupSchema = Yup.object().shape({
    course_id: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    subject_id: Yup.string().required("*Required"),
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
    onSubmit: (values) => {
      setFromDate(values.fromdate);
      setToDate(values.endDate);
      setIsDisabled(true);
      setFinalAttendence([]);
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
      setSubject(false);
    }
  }, [formik.values.course_id]);
  useEffect(() => {
    let finalPhaseData = Semester?.filter(
      (p) => p.course_id === formik.values.course_id
    );
    setFinalPhase([...finalPhaseData]);
  }, [formik.values.course_id]);

  useEffect(() => {
    let finalSubjectData = Subjects?.filter(
      (s) => s.semester_id === formik.values.semester_id
    );
    setFinalSubjects([...finalSubjectData]);
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
    const transformSubjects = finalAttendence.map((student, index) => {
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
      <AddStudentAttendenceModal
        setShow={setShow}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <form onSubmit={formik.handleSubmit}>
        <Row className="row-sm mt-3">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h3">Filter Student Attendance</Card.Title>
                <div className="d-flex">
                  <button
                    onClick={() => handleDownloadClick()}
                    className="btn btn-primary me-2"
                  >
                    Download CSV template
                  </button>
                  <button
                    onClick={() => handleShow()}
                    className="btn btn-primary me-2"
                  >
                    Add Attendance
                  </button>
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
                          {finalPhase?.length > 0
                            ? finalPhase?.map((semester) => {
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
                          {finalSubject?.length > 0
                            ? finalSubject?.map((subject) => {
                                return (
                                  <option value={subject?._id}>
                                    {subject?.name}
                                  </option>
                                );
                              })
                            : ""}
                        </select>
                        {formik.errors.subject_id &&
                        formik.touched.subject_id ? (
                          <div className="red_color">
                            {formik.errors.subject_id}
                          </div>
                        ) : null}
                      </Col>

                      {/* {subject ? (
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
                      )} */}
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
                          setFinalAttendence([]);
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
      {finalAttendence?.length > 0 ? (
        <div className="table-responsive">
          <Card>
            <Card.Header>
              <div className="w-100 d-flex justify-content-between">
                <div>
                  <h4>
                    Subject:
                    {finalAttendence[0].subjects
                      ? finalAttendence[0].subjects[0]?.name?.split("-")[0]
                      : ""}
                  </h4>
                  <p>
                    From Date:{fromDate} to {toDate}
                  </p>
                </div>
                <button onClick={exportCSV} className="btn btn-primary h-50">
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
