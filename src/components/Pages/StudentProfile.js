import React, { useEffect, useState } from "react";
import { Tabs, Tab, Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/Action/StudentAction";
import { fetchCourse } from "../../redux/Action/CourseAction";
import { fetchSemester } from "../../redux/Action/SemesterAction";
import { fetchSubject } from "../../redux/Action/SubjectAction";
import DataTable from "react-data-table-component";
import { fetchSingleStudentsAttendence } from "../../redux/Action/StudentAttendenceAction";

export default function StudentProfile() {
  const dispatch = useDispatch();
  const params = useParams();
  const [finalAttendence, setFinalAttendence] = React.useState([]);
  const [topAttendence, setTopAttendence] = React.useState([]);
  const [month, setMonth] = React.useState(moment().format("MMMM"));
  const [year, setYear] = React.useState(moment().format("YYYY"));
  const [type, setType] = React.useState("Theory");
  const { students, Courses, Semesters, StudentAttendence, Subjects } =
    useSelector((state) => ({
      students: state?.students?.students.filter(
        (item) => item._id == params.id
      ),
      Courses: state?.courses?.courses.filter(
        (item) => item._id == params.course
      ),
      Semesters: state?.semesters?.semesters.filter(
        (item) => item._id == params.semester
      ),
      Subjects: state?.subjects?.subjects,
      StudentAttendence: state?.studentsAttendence?.singleStudentAttendance,
    }));
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (date) => {
    setSelectedYear(date.getFullYear());
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // Generate dynamic columns for each day of the month
    ...Array(31) // Assuming 31 days in the month
      .fill(null)
      .map((_, index) => ({
        name: `${index + 1}`,
        sortable: false, // Disable sorting for day columns
        width: "33px", // Adjust width as needed
        conditionalCellStyles: [
          {
            when: (cell) => cell.days[index + 1] == "Present", // Example condition
            style: { backgroundColor: "#00FF00" },
          },
          {
            when: (cell) => cell.days[index + 1] == "Absent",
            style: { backgroundColor: "#FF0000" },
          },
          {
            when: (cell) =>
              cell.days[index + 1] !== "Present" &&
              cell.days[index + 1] !== "Absent",
            style: { backgroundColor: "#FFFF00" },
          },
        ],
      })),
  ];

  useEffect(() => {
    if (params.id.length > 0) {
      let typeValue = type;
      let value = { id: params.id, type: typeValue, month: month, year: year };
      dispatch(fetchSingleStudentsAttendence(value));
    }
    dispatch(fetchStudents());
    dispatch(fetchCourse());
    dispatch(fetchSubject());
    dispatch(fetchSemester());
  }, [month, type, year]);
  useEffect(() => {
    if (finalAttendence?.length > 0) {
      function calculateAttendance(scheduleData) {
        const attendance = {};

        scheduleData.forEach((course) => {
          const courseName = course.name;
          attendance[courseName] = {
            presentDays: 0,
            absentDays: 0,
          };

          for (const day in course.days) {
            if (course.days[day] === "Present") {
              attendance[courseName].presentDays++;
            } else if (course.days[day] === "Absent") {
              attendance[courseName].absentDays++;
            }
          }
        });

        return attendance;
      }
      const attendanceData = calculateAttendance(finalAttendence);
      function convertAttendanceToArray(attendanceObject) {
        const attendanceArray = [];
        for (const subject in attendanceObject) {
          const subjectData = attendanceObject[subject];
          attendanceArray.push({
            subject: subject,
            presentDays: subjectData.presentDays,
            absentDays: subjectData.absentDays,
          });
        }
        return attendanceArray;
      }
      const finaldata = convertAttendanceToArray(attendanceData);
      setTopAttendence(finaldata);
    }
  }, [finalAttendence]);

  function extractNamesById(array, targetId) {
    return array.filter((obj) => obj._id === targetId).map((obj) => obj.name);
  }
  function takeLastTwoAlphas(str) {
    const dateParts = str.split("-");
    return parseInt(dateParts[2], 10);
  }

  useEffect(() => {
    if (Subjects.length < 0 && StudentAttendence[0].length < 0) {
      dispatch(fetchSubject);
      dispatch(fetchSingleStudentsAttendence);
    } else {
      const subjectsArray = StudentAttendence[0]
        ?.filter(
          (obj, index, arr) =>
            arr.findIndex(
              (innerObj) => innerObj.subject_id === obj.subject_id
            ) === index
        ) // Filter unique subjects
        .map((obj) => ({
          name: extractNamesById(Subjects, obj.subject_id)[0],
          days: StudentAttendence[0]
            .filter((innerObj) => innerObj.subject_id === obj.subject_id)
            .reduce((accumulatedAttendance, innerObj) => {
              accumulatedAttendance[takeLastTwoAlphas(innerObj.a_date)] =
                innerObj.attendance_status;
              return accumulatedAttendance;
            }, {}),
        }));

      console.log(subjectsArray);
      setFinalAttendence(subjectsArray);
    }
  }, [StudentAttendence[0], Subjects]);
  function getFirstLetter(str) {
    return str.charAt(0);
  }
  return (
    <div className="mt-2">
      {students?.length && Courses?.length && Semesters?.length > 0 ? (
        <Row id="user-profile">
          <Col lg={6} md={6} xl={6} sm={12}>
            <Card className="bg-transparent shadow-none border-0">
              <Card.Body className="bg-white small-radius">
                <div className="wideget-user">
                  <Row>
                    <Col
                      lg={2}
                      md={2}
                      xl={2}
                      sm={12}
                      className="d-flex justify-content-center"
                    >
                      {/* <img
                        className="rounded"
                        src={profile}
                        width={100}
                        height={100}
                      /> */}
                      <span className="colored-letter">
                        {getFirstLetter(students[0].name)}
                      </span>
                    </Col>
                    <Col lg={10} md={10} xl={10} sm={12} xs={12}>
                      <Row>
                        <Col>
                          <h4 className="mb-0">
                            <strong>{students[0].name}</strong>
                          </h4>
                        </Col>
                        <Col className="d-flex justify-content-end">
                          <h4 className="mb-0">
                            <strong>{Semesters[0].name}</strong>
                          </h4>
                        </Col>
                      </Row>
                      <Row className="border-bottom border-dark">
                        <Col>{students[0].roll_no}</Col>
                        <Col className="d-flex justify-content-end">
                          {Courses[0].name}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-4 mt-2 border-end border-dark">
                          <p className="mb-0">
                            <strong>Born:</strong>&nbsp;{students[0].dob}
                          </p>
                          <p className="mb-0">
                            <strong>Gender:</strong>
                            {students[0]?.gender}
                          </p>
                          <p className="mb-0">
                            <strong>Father's Name:</strong>&nbsp;{" "}
                            {students[0]?.father_name}
                          </p>
                        </Col>
                        <Col className="p-4 mt-2">
                          <p className="mb-0">
                            <strong>Batch:</strong>&nbsp;{students[0]?.batch}
                          </p>
                          {/* <p className="mb-0">
                            <strong>ELL:</strong>Never Ell
                          </p>
                          <p className="mb-0">
                            <strong>SWD:</strong>&nbsp;
                          </p> */}
                          <p className="mb-0">
                            <strong>Phone:</strong>&nbsp;{students[0]?.phone_no}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={6} xl={6} sm={12}>
            <Card
              className="bg-transparent shadow-none border-0"
              id="fix-height"
            >
              <Card.Body className="bg-white small-radius">
                <div className="wideget-user">
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      xl={12}
                      sm={12}
                      className="border-bottom border-dark"
                    >
                      <h4>
                        <strong>Attendence</strong>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    {topAttendence.length > 0
                      ? topAttendence.map((item) => {
                          return (
                            <Col lg={6} md={6} sm={12} xs={12}>
                              {item.subject}:{item.presentDays}/
                              {item.presentDays + item.absentDays}
                            </Col>
                          );
                        })
                      : ""}
                  </Row>
                  {/* <Row>
                    <Col
                      lg={6}
                      md={6}
                      xl={6}
                      sm={6}
                      className="mt-2 border-end border-dark"
                    >
                      <h3 className="text-success mt-7 mb-5">
                        <strong>98.11%</strong>
                      </h3>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      xl={6}
                      sm={6}
                      className="mt-2 border-dark text-center"
                    >
                      <h5 className="text-warning mt-5 mb-0 ">
                        <strong>2.5</strong>
                      </h5>
                      <h6 className="mt-0">Absent</h6>
                      <h5 className="text-warning mt-5 mb-0 ">
                        <strong>0</strong>
                      </h5>
                      <h6 className="mt-0">Tandy</h6>
                    </Col>
                  </Row> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col lg={3} md={3} xl={63} sm={12}>
            <Card className="bg-transparent shadow-none border-0">
              <Card.Body className="bg-white small-radius">
                <div className="wideget-user">
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      xl={12}
                      sm={12}
                      className="border-bottom border-dark"
                    >
                      <h4>
                        <strong>Referrals</strong>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={6}
                      md={6}
                      xl={6}
                      sm={6}
                      className="mt-2 border-end border-dark"
                    >
                      <h3 className="text-success mt-7 mb-5">
                        <strong>0</strong>
                      </h3>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      xl={6}
                      sm={6}
                      className="mt-2 border-dark text-center"
                    >
                      <h5 className="text-warning mt-5 mb-0 ">
                        <strong>0</strong>
                      </h5>
                      <h6 className="mt-0">Minor</h6>
                      <h5 className="text-warning mt-5 mb-0 ">
                        <strong>0</strong>
                      </h5>
                      <h6 className="mt-0">Major</h6>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      ) : (
        ""
      )}
      <div className="table-responsive">
        <Card>
          <Card.Title>
            <div className="d-flex pt-5 ps-5 pe-5 text-center align-item-center justify-content-between">
              <h3>Attendance for Month: {month}</h3>
              <div>
                <select
                  className="border-none"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <select
                  className="border-none"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  className="border-none"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                  <option value="Clinical">Clinical</option>
                  <option value="Ece">Ece</option>
                  <option value="Aetcom">Aetcom</option>
                  <option value="Fap">Fap</option>
                </select>
              </div>
            </div>
            <div class="d-flex ps-5 pe-5">
              <input type="checkbox" className="green" id="lightgreen" />
              &nbsp; Present&nbsp; &nbsp;
              <input type="checkbox" className="yellow" id="lightgreen" />
              &nbsp; Absent&nbsp; &nbsp;
              <input type="checkbox" className="nm" id="lightgreen" />
              &nbsp; Not Marked
            </div>
          </Card.Title>
          <Card.Body>
            <DataTable columns={columns} data={finalAttendence} />
          </Card.Body>
        </Card>
      </div>
      {/* <EditProfileModal profile="profile" role={sessionStorage.getItem("role")} editUser={profileData} open={open} scroll={scroll} handleClose={handleClose} /> */}
      {/* <UserDetailModal/> */}
    </div>
  );
}
