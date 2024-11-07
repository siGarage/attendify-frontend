import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Row, Card, Col, Breadcrumb, Dropdown, Button } from "react-bootstrap";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  studentDelete,
} from "../../../redux/Action/StudentAction";
import { fetchBiometric } from "../../../redux/Action/BiometricAction";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, exams, students, bios } = useSelector((state) => ({
    users: state?.userAuth?.users,
    exams: state?.exam?.exams,
    students: state?.students?.students,
    biometric: state?.students?.students,
    bios: state?.bios?.bio,
  }));
  const [show, setShow] = useState(false);
  const [run, setRun] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [isDisabled, setIsDisabled] = useState(false);
  const [editUser, setEditUser] = useState();
  const [deleteId, setDeleteId] = useState();
  const handleClose = () => setShow(false);
  const handleClickOpen = (scrollType, row) => () => {
    setEditUser(row);
    setOpen(true);
    setScroll(scrollType);
  };
  function mergeArrays(filteredData, bios) {
    const mergedArray = [];
    filteredData?.forEach((student) => {
      const matchingStudent = bios.find((item) => item.user_id === student._id);
      if (matchingStudent) {
        mergedArray.push({
          ...student,
          ...matchingStudent,
          student_id: student._id,
        });
      } else {
        mergedArray.push({ student, student_id: student._id });
      }
    });
    return mergedArray;
  }

  useEffect(() => {
    let d = students;
    let tdata = mergeArrays(students, bios);
    setFilteredData(tdata);
  }, []);

  const handleStatusUpdate = (row) => {
    // dispatch(userUpdate({ ...row, type: "user" }))
    //     .then(() => {
    //         dispatch(fetchUserByRole(2))
    //     })
    //     .catch(err => console.log(err))
  };
  const userDeleteAction = () => {
    setShow(false);
    dispatch(studentDelete(deleteId));
    setRun(true);
  };
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchBiometric());
    setRun(false);
  }, [run]);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const handleOpen = (id) => {
    setShow(true);
    setUserData(id);
  };

  const handleOpenUserModal = (id) => {
    setShowUserProfile(true);
    setUserData(id);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      roll_no: "",
    },
    onSubmit: (values) => {
      const filteredData = students?.filter((student) => {
        let matches = true;
        if (values.name) {
          matches =
            matches &&
            student.name.toLowerCase().includes(values.name.toLowerCase());
        }
        if (values.roll_no) {
          matches = matches && student.roll_no.toString() === values.roll_no;
        }
        return matches;
      });
      let dataFinal = mergeArrays(filteredData, bios);
      setFilteredData(dataFinal);
    },
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Students
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Student
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Add Student
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/add-single-student">Single</Dropdown.Item>
              <Dropdown.Item href="/add-student">Multiple</Dropdown.Item>
            </Dropdown.Menu>{" "}
             
          </Dropdown>
          {/* <Link
            to=""
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Students
          </Link> */}
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Students</h3>
            </Card.Header>
            <Card.Body>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card className="removeShadow">
                  <form onSubmit={formik.handleSubmit}>
                    <Row>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Name</label>
                          <input
                            className="form-control required"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          {formik.errors.name ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </Col>
                        <Col
                          sm={12}
                          lg={1}
                          md={1}
                          xl={1}
                          className="d-flex align-items-center"
                          style={{ marginTop: "30px", marginLeft: "10px" }}
                        >
                          <p>OR</p>
                        </Col>
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Roll No.</label>
                          <input
                            className="form-control required"
                            type="text"
                            name="roll_no"
                            placeholder="Roll No"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.roll_no}
                          />
                          {formik.errors.roll_no && formik.touched.roll_no ? (
                            <div className="red_color">
                              {formik.errors.roll_no}
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
                          Search
                        </Button>

                        <Button
                          type="button"
                          variant="danger"
                          className="me-1 mt-5"
                          onClick={() => {
                            formik.resetForm();
                            setFilteredData([...students]);
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </Row>
                  </form>
                </Card>
              </Col>
              <div className="table-responsive">
                <datatable.StudentDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleOpenUserModal={handleOpenUserModal}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleOpen={handleOpen}
                  handleClickOpen={handleClickOpen}
                  Students={filteredData}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <WarningModal
        setShow={setShow}
        propertyDeleteAction={userDeleteAction}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <UserDetailModal
        setShow={setShowUserProfile}
        show={showUserProfile}
        userData={userData}
      />
    </div>
  );
}
