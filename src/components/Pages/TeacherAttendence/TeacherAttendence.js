import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  studentDelete,
} from "../../../redux/Action/StudentAction";
import {
  fetchTeachersAttendence,
  teacherAttendenceDelete,
} from "../../../redux/Action/TeacherAttendenceAction";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
export default function StudentAttendence() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, exams, teacherAttendence } = useSelector((state) => ({
    users: state?.userAuth?.users,
    exams: state?.exam?.exams,
    students: state?.students?.students,
    teacherAttendence: state?.teachersAttendence?.teachersAttendence,
  }));
  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const [deleteId, setDeleteId] = useState();

  const handleClickOpen = (scrollType, row) => () => {
    setEditUser(row);
    setOpen(true);
    setScroll(scrollType);
  };
  const handleStatusUpdate = (row) => {
    // dispatch(userUpdate({ ...row, type: "user" }))
    //     .then(() => {
    //         dispatch(fetchUserByRole(2))
    //     })
    //     .catch(err => console.log(err))
  };
  const handleClose = () => setShow(false);

  const userDeleteAction = () => {
    setShow(false);
    dispatch(teacherAttendenceDelete(deleteId));
    dispatch(fetchTeachersAttendence());
  };

  useEffect(() => {
    dispatch(fetchTeachersAttendence());
  }, []);

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

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Teachers Attendence</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Teachers Attendence
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Teachers
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-teacher-attendence"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Teachers Attendence
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Teachers Attendence</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.TeacherAttendenceDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleOpenUserModal={handleOpenUserModal}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleOpen={handleOpen}
                  handleClickOpen={handleClickOpen}
                  teachersAttendence={teacherAttendence}
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
