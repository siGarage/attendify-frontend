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
  const [fdate, setFdate] = useState(new Date());
  const [finalLecture, setFinalLecture] = useState("");
  const [finalDates, setFinalDates] = useState([]);
  const params = useParams();
  const [finalAttendance, setFinalAttendance] = useState([]);
  const { Subjects, teachers } = useSelector((state) => ({
    teachers: state?.teachers?.teachers?.filter(
      (item) => item?._id == params?.id
    ),
    Subjects: state?.subjects?.subjects,
    // TeacherAttendance: state?.teachersAttendence?.singleteacherAttendance,
  }));

  function filterByDate(array, date) {
    return array?.filter((item) => {
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
  function convertDateStringsToDateObjects(dateStrings) {
    return dateStrings?.map((dateString) => {
      const [datePart, timePart] = dateString.split(" ");
      const [year, month, day] = datePart.split("-").map(Number);
      return new Date(year, month - 1, day);
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
        const dates = data?.map((d) => d.a_date);
        let finalDates = convertDateStringsToDateObjects(dates);
        setFinalDates(finalDates);
        setFinalLecture(data.length);
        const filteredArray = filterByDate(
          data,
          moment(fdate).format("YYYY-MM-DD")
        );
        let Data = filteredArray?.map((da) => {
          return {
            ...da,
            Subject: Subjects?.filter((sub) => sub?._id === da?.subject_id),
          };
        });
        setFinalAttendance(Data);
      });
    dispatch(fetchTeachers());
    dispatch(fetchCourse());
    dispatch(fetchSubject());
    dispatch(fetchSemester());
  }, [fdate]);

  const markedDates = [
    new Date(2024, 11, 7), // December 7, 2023
    new Date(2024, 11, 25), // December 25, 2023
  ];

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
                      </Row>
                      <Row className="border-bottom border-dark">
                        <Col>{teachers[0].emp_id}</Col>
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
                        </Col>
                        <Col className="p-4 mt-2">
                          <p className="mb-0">
                            <strong>Phone:</strong>&nbsp;{teachers[0]?.phone_no}
                          </p>
                          {/* <p className="mb-0">
                            <strong>Total Lecture:</strong>&nbsp;
                            {finalLecture ? finalLecture : 0}
                          </p> */}
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
              <h3>
                Total Lecture:&nbsp;
                {finalLecture ? finalLecture : 0}
              </h3>
              <h3>
                Selected Date:&nbsp;
                {moment(fdate).format("DD-MM-YYYY")}
              </h3>
            </div>
          </Card.Title>
          <Card.Body>
            <Row>
              <Col xs={12} sm={6} lg={4} md={4}>
                <Calendar
                  onChange={setFdate}
                  value={fdate}
                  tileClassName={({ date, view }) => {
                    if (
                      view === "month" &&
                      finalDates.some((d) => d.getTime() === date.getTime())
                    ) {
                      return "marked-date";
                    }
                  }}
                />
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
