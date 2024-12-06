import React, { useEffect, useState } from "react";
import { Tabs, Tab, Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/Action/TeacherAction";
import { fetchCourse } from "../../redux/Action/CourseAction";
import { fetchSemester } from "../../redux/Action/SemesterAction";
import { fetchSubject } from "../../redux/Action/SubjectAction";
import DataTable from "react-data-table-component";
import "react-calendar/dist/Calendar.css";
import { fetchSingleTeacherAttendence } from "../../redux/Action/TeacherAttendenceAction";
import Calendar from "react-calendar";

export default function TeacherProfile() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const params = useParams();
  const [finalAttendance, setFinalAttendance] = useState([]);
  const { Subjects, teachers } = useSelector((state) => ({
    teachers: state?.teachers?.teachers?.filter(
      (item) => item._id == params?.id
    ),
    Subjects: state?.subjects?.subjects,
    // TeacherAttendance: state?.teachersAttendence?.singleteacherAttendance,
  }));

  function filterByDate(array, date) {
    return array.filter((item) => {
      const itemDate = new Date(item.a_date);
      const filterDate = new Date(date);

      // Compare the dates, ignoring time
      return (
        itemDate.getFullYear() === filterDate.getFullYear() &&
        itemDate.getMonth() === filterDate.getMonth() &&
        itemDate.getDate() === filterDate.getDate()
      );
    });
  }
  useEffect(() => {
    let value = { id: params.id };
    const fetchOptions = {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    };
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}fetchSingleTeacherAttendences`,
      fetchOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredArray = filterByDate(
          data,
          moment(date).format("YYYY-MM-DD")
        );
        let Data = filteredArray?.map((da) => {
          return {
            ...da,
            Subject: Subjects?.filter((sub) => sub._id === da.subject_id),
          };
        });
        setFinalAttendance(Data);
      });
    dispatch(fetchTeachers());
    dispatch(fetchCourse());
    dispatch(fetchSubject());
    dispatch(fetchSemester());
  }, [date]);

  // useEffect(() => {
  //   if (TeacherAttendance?.length > 0) {
  //     const Tea = TeacherAttendance?.map((tea) => {
  //       return {
  //         ...tea,
  //         SubjectName: Subjects?.filter((sub) => sub._id === tea.subject_id),
  //       };
  //     });
  //     if (Tea?.length > 0) {
  //       setFinalAttendence(Tea);
  //     }
  //   } else {
  //     if (params?.id?.length > 0) {
  //       let value = { id: params.id, date: moment(date).format("YYYY-MM-DD") };
  //       dispatch(fetchSingleTeacherAttendence(value));
  //     }
  //   }
  // }, [date]);
  function getFirstLetter(str) {
    return str.charAt(0);
  }

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  return (
    <div className="mt-2">
      {teachers?.length > 0 ? (
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
                        {getFirstLetter(teachers[0].name)}
                      </span>
                    </Col>
                    <Col lg={10} md={10} xl={10} sm={12} xs={12}>
                      <Row>
                        <Col>
                          <h4 className="mb-0">
                            <strong>{teachers[0].name}</strong>
                          </h4>
                        </Col>
                        {/* <Col className="d-flex justify-content-end">
                          <h4 className="mb-0">
                            <strong>{Semesters[0].name}</strong>
                          </h4>
                        </Col> */}
                      </Row>
                      <Row className="border-bottom border-dark">
                        <Col>{teachers[0].emp_id}</Col>
                        {/* <Col className="d-flex justify-content-end">
                          {Courses[0].name}
                        </Col> */}
                      </Row>
                      <Row>
                        <Col className="p-4 mt-2 border-end border-dark">
                          <p className="mb-0">
                            <strong>Born:</strong>&nbsp;
                            {moment(teachers[0].dob).format("DD/MM/YYYY")}
                          </p>
                          <p className="mb-0">
                            <strong>Gender:</strong>
                            {teachers[0]?.gender}
                          </p>
                          {/* <p className="mb-0">
                            <strong>Father's Name:</strong>&nbsp;{" "}
                            {students[0]?.father_name}
                          </p> */}
                        </Col>
                        <Col className="p-4 mt-2">
                          {/* <p className="mb-0">
                            <strong>Batch:</strong>&nbsp;{students[0]?.batch}
                          </p> */}
                          {/* <p className="mb-0">
                            <strong>ELL:</strong>Never Ell
                          </p>
                          <p className="mb-0">
                            <strong>SWD:</strong>&nbsp;
                          </p> */}
                          <p className="mb-0">
                            <strong>Phone:</strong>&nbsp;{teachers[0]?.phone_no}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
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
              <h3>Attendance</h3>
              {/* <div>
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
              </div> */}
            </div>
          </Card.Title>
          <Card.Body>
            <Row>
              <Col xs={12} sm={6} lg={4} md={4}>
                <Calendar onChange={setDate} value={date} />
                
              </Col>
              <Col>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Sr no.</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalAttendance.length > 0
                      ? finalAttendance.map((f, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{f.Subject[0]?.name}</td>
                              <td>{f.type}</td>
                              <td>{f.attendance_status}</td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </Col>
            </Row>
            {/* <DataTable columns={columns} data={finalAttendence} /> */}
          </Card.Body>
        </Card>
      </div>
      {/* <EditProfileModal profile="profile" role={sessionStorage.getItem("role")} editUser={profileData} open={open} scroll={scroll} handleClose={handleClose} /> */}
      {/* <UserDetailModal/> */}
    </div>
  );
}
