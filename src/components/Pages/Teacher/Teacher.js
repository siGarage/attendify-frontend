import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  teacherDelete
} from "../../../redux/Action/TeacherAction";
import {
  fetchDepartment
} from "../../../redux/Action/DepartmentAction";
import {} from "../../../redux/Action/AuthAction";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
import Departemnt from "../Department/Department";
export default function Teachers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers,Departments } = useSelector((state) => ({
    users: state?.userAuth?.users,
    exams: state?.exam?.exams,
    teachers: state?.teachers?.teachers,
    Departments: state?.departments?.departments
  }));
  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const [finalTeacher, setFinalTeacher] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const handleClose = () => setShow(false);

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
  useEffect(() => {
    const Tea = teachers?.map((tea) => {
      return {
        ...tea,
        departmentName: Departments?.filter(({ _id }) => tea.department_id === _id),
      };
    });
    if (Tea?.length > 0) {
      setFinalTeacher(Tea);
    }
  }, [Departments, teachers]);
  const userDeleteAction = () => {
    setShow(false);
    dispatch(teacherDelete(deleteId));
    dispatch(fetchTeachers());
  };

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDepartment());
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
          <h1 className="page-title">Teachers</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Teachers
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Teacher
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-teacher"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Teachers
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Teachers</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.TeacherDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleOpenUserModal={handleOpenUserModal}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleOpen={handleOpen}
                  handleClickOpen={handleClickOpen}
                  Teachers={finalTeacher}
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
