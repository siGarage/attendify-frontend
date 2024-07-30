import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import * as dashboard from "../../data/dashboard/dashboard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchDepartment } from "../../redux/Action/DepartmentAction";
import { fetchCourse } from "../../redux/Action/CourseAction";
import { fetchSubject } from "../../redux/Action/SubjectAction";
import { fetchStudentsAttendence } from "../../redux/Action/StudentAttendenceAction";
// import { Chart } from "react-google-charts";
import API from "../../service/API";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  useEffect(() => {
    // attendenceReport();
    dispatch(fetchDepartment());
    dispatch(fetchCourse());
    dispatch(fetchSubject());
    dispatch(fetchStudentsAttendence());
  }, []);

  // const attendenceReport = async () => {
  //   const { data } = await API.get(`/getStudentAttendences`);
  //   let finalData = data?.filter((item) =>
  //     moment(item.date)
  //       .format("DD/MM/YYYY")
  //       .toLowerCase()
  //       .includes(today.format("DD/MM/YYYY"))
  //   );
  //   if (finalData?.length > 0) {
  //     let presentData = finalData?.filter(
  //       (item) => item.attendence_status == "Present"
  //     );
  //     setPresent(presentData.length);
  //     let absentData = finalData?.filter(
  //       (item) => item.attendence_status !== "Present"
  //     );
  //     setAbsent(absentData.length);
  //   }
  // };

  const today = moment();
  const { Departments, Courses, Subjects } = useSelector((state) => ({
    Departments: state?.departments?.departments,
    Courses: state?.courses?.courses,
    Subjects: state?.subjects?.subjects,
    studentAttendece: state?.studentsAttendence?.studentsAttendence,
  }));
  const data = [
    ["Year", "Present", "Absent"],
    ["1st May 2024", 500, 400],
    ["2.06.2024", 425, 75],
    ["3.06.2024", 987, 0],
    ["4.06.2024", 800, 187],
    ["4.06.2024", 900, 87],
    ["4.06.2024", 600, 87],
    ["4.06.2024", 900, 87],
    ["4.06.2024", 600, 87],
    ["4.06.2024", 400, 87],
    ["4.06.2024", 200, 87],
    ["4.06.2024", 800, 87],
  ];

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
                          end={Departments.length}
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
                          end={Courses.length}
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
                          end={Subjects.length}
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
              <Card className=" overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h6 className="">Today Attendance</h6>
                      <h5 className="mb-2 number-font">
                        {/* $ */}
                        Present:
                        <CountUp
                          end={present}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h5>
                      <p className="text-muted mb-0">
                        Absent:
                        <CountUp
                          end={absent}
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
                <Card.Header className="card-header">
                  <div>
                    <h3 className="card-title">Monthly Attedence Chart</h3>
                  </div>
                </Card.Header>
                <Card.Body className="card-body pb-0 pt-4">
                  {/* <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                  /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
