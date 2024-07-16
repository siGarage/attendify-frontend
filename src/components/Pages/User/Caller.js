import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { fetchUserByRole, userDelete, userListUpdate, userUpdate } from "../../../redux/Action/AuthAction";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
export default function User() {
  const dispatch = useDispatch();

  const { users } = useSelector(state => ({
    users: state?.userAuth?.users,
  }));

  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const [deleteId, setDeleteId] = useState();

  const handleClickOpen = (scrollType, row) => () => {
    setEditUser(row)
    setOpen(true);
    setScroll(scrollType);
  };

  const handleStatusUpdate = (row) => {
    dispatch(userUpdate({ ...row, type: "user" }))
    .then(()=>dispatch(fetchUserByRole(3)))
  };
  const handleOpenUserModal = (id) => {
    setShowUserProfile(true);
    setUserData(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchUserByRole(3))
  }, [])

  const userDeleteAction = (id) => {
    dispatch(userDelete(deleteId));
  }

  const handleShow = (id) => {
    setDeleteId(id)
    setShow(true)
  };

  const handleOpen = (id) => {
    setShow(true);
    setUserData(id);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Users
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              User
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/callerAdd" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add User
          </Link>
          <Link to="/callerTeamList" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Team Leader
          </Link>
          {/* <Link to="#" className="btn btn-success btn-icon text-white">
            <span>
              <i className="fe fe-log-in"></i>&nbsp;
            </span>
            Export
          </Link> */}
        </div>
      </div>



      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">User</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.CallerDataTables handleStatusUpdate={handleStatusUpdate} handleOpenUserModal={handleOpenUserModal} handleOpen={handleOpen} handleShow={handleShow} userDeleteAction={userDeleteAction} handleClickOpen={handleClickOpen} users={users} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <WarningModal setShow={setShow} propertyDeleteAction={userDeleteAction} show={show} handleShow={handleShow} />
      <UserDetailModal setShow={setShowUserProfile} show={showUserProfile} userData={userData} />
    </div>
  );
}
