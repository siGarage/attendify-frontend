import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import * as dashboard from "../../data/dashboard/dashboard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchDashboardData } from "../../redux/Action/GroupAction";
import Spinner from "react-bootstrap/Spinner";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [chartData, setCartData] = useState([]);
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);
  const { DashboardData } = useSelector((state) => ({
    DashboardData: state?.groups?.dashboardData,
  }));
  console.log(DashboardData);
  // const today = moment();
  // const {
  //   Departments,
  //   Courses,
  //   Subjects,
  //   TodayAttendance,
  //   MonthlyAttendance,
  //   students,
  //   teachers,
  // } = useSelector((state) => ({
  //   Departments: state?.departments?.departments,
  //   Courses: state?.courses?.courses,
  //   Subjects: state?.subjects?.subjects,
  //   studentAttendece: state?.studentsAttendence?.studentsAttendence,
  //   TodayAttendance: state?.studentsAttendence?.todayAttendance,
  //   MonthlyAttendance: state?.studentsAttendence?.monthlyAttendence,
  //   students: state?.students?.students,
  //   teachers: state?.teachers?.teachers,
  // }));

  // useEffect(() => {
  //   const count = TodayAttendance[0]?.reduce((count, attendance) => {
  //     return attendance.attendence_status === "Present" ? count + 1 : count;
  //   }, 0);
  //   setPresent(count);
  //   setAbsent(TodayAttendance[0]?.length - count);
  // }, [TodayAttendance]);

  // useEffect(() => {
  //   const uniqueDates = MonthlyAttendance.map((item) => item.a_date).filter(
  //     (date, index, self) => self.indexOf(date) === index
  //   );

  //   function countStudentsByStatus(MonthlyAttendance, uniqueDates) {
  //     const dateCounts = {};
  //     uniqueDates?.forEach((date) => {
  //       dateCounts[date] = {
  //         present: 0,
  //         absent: 0,
  //       };
  //     });
  //     MonthlyAttendance?.forEach((attendance) => {
  //       if (uniqueDates.includes(attendance.a_date)) {
  //         dateCounts[attendance.a_date][
  //           attendance?.attendence_status?.toLowerCase()
  //         ]++;
  //       }
  //     });
  //     return dateCounts;
  //   }
  //   const data = countStudentsByStatus(MonthlyAttendance, uniqueDates);
  //   function convertObjectToArray(data) {
  //     return Object.entries(data).map(([date, counts]) => ({
  //       date,
  //       present: counts.present,
  //       absent: counts.absent,
  //     }));
  //   }
  //   const chartData = convertObjectToArray(data);
  //   let finalData = [["Year", "Present", "Absent"]];
  //   chartData.map((item) => {
  //     finalData.push([item.date, item.present, item.absent]);
  //   });
  //   setCartData(finalData);
  // }, [MonthlyAttendance]);

  // const data = [
  //   ["Year", "Present", "Absent"],
  //   ["1st May 2024", 500, 400],
  //   ["2.06.2024", 425, 75],
  //   ["3.06.2024", 987, 0],
  //   ["4.06.2024", 800, 187],
  //   ["4.06.2024", 900, 87],
  //   ["4.06.2024", 600, 87],
  //   ["4.06.2024", 900, 87],
  //   ["4.06.2024", 600, 87],
  //   ["4.06.2024", 400, 87],
  //   ["4.06.2024", 200, 87],
  //   ["4.06.2024", 800, 87],
  // ];

  const options = {
    title: "Monthly Attendence Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <Row>
            <Col lg={6} md={12} sm={12} xl={3}>
              <Card className=" overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Total Departments</h6>
                      <h3 className="mb-2 number-font">
                        <CountUp
                          end={DashboardData?.departmentCount}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      {/* <p className="text-muted mb-0">
                        <span className="text-primary me-1">
                          <i className="fa fa-chevron-circle-up text-primary me-1"></i>
                          <span>3% </span>
                        </span>
                        last month
                      </p> */}
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-primary-gradient box-shadow-primary brround ms-auto">
                        <i className="fa fa-building text-white  mb-1"></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xl-3">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Total Courses</h6>
                      <h3 className="mb-2 number-font">
                        <CountUp
                          end={DashboardData?.courseCount}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-danger-gradient box-shadow-danger brround  ms-auto">
                        <i className="icon icon-rocket text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
            <Col lg={6} md={12} sm={12} xl={3}>
              <Card className="card overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Total Subjects</h6>
                      <h3 className="mb-2 number-font">
                        {/* $ */}
                        <CountUp
                          end={DashboardData?.subjectCount}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      {/* <p className="text-muted mb-0">
                        <span className="text-success me-1">
                          <i className="fa fa-book text-success me-1"></i>
                          <span>0.5% </span>
                        </span>
                        last month
                      </p> */}
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-secondary-gradient box-shadow-secondary brround ms-auto">
                        <i className="fa fa-book text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={12} sm={12} xl={3}>
              <Card className="card overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Total Students</h6>
                      <h3 className="mb-2 number-font">
                        {/* $ */}
                        <CountUp
                          end={DashboardData?.studentCount}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      {/* <p className="text-muted mb-0">
                        <span className="text-success me-1">
                          <i className="fa fa-book text-success me-1"></i>
                          <span>0.5% </span>
                        </span>
                        last month
                      </p> */}
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-info-gradient box-shadow-secondary brround ms-auto">
                        <i className="fa fa-graduation-cap text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={12} sm={12} xl={3}>
              <Card className="card overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Total Teachers</h6>
                      <h3 className="mb-2 number-font">
                        {/* $ */}
                        <CountUp
                          end={DashboardData?.teacherCount}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      {/* <p className="text-muted mb-0">
                        <span className="text-success me-1">
                          <i className="fa fa-book text-success me-1"></i>
                          <span>0.5% </span>
                        </span>
                        last month
                      </p> */}
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-warning-gradient box-shadow-secondary brround ms-auto">
                        <i className="fa fa-graduation-cap text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={12} sm={12} xl={3}>
              <Card className=" overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Today Attendance</h6>
                      <h5 className="mb-2 number-font">
                        {/* $ */}
                        Present:
                        <CountUp
                          end={DashboardData?.todaysPresentStudents}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h5>
                      <p className="text-muted mb-0">
                        Absent:
                        <CountUp
                          end={DashboardData?.todaysAbsentStudents}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </p>
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-success-gradient box-shadow-success brround  ms-auto">
                        <i className="fe fe-briefcase text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={8} md={12}>
              <Card className=" overflow-hidden">
                {/* <Card.Header className="card-header">
                  <div>
                    <h3 className="card-title">Monthly Attedence Chart</h3>
                  </div>
                </Card.Header> */}
                {/* <Card.Body className="card-body pb-0 pt-4">
                  {chartData?.length <= 1 ? (
                    <div className="d-flex justify-content-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    ""
                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="400px"
                      data={chartData}
                      options={options}
                    />
                  )}
                </Card.Body> */}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
