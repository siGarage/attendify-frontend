import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByRole, upadateApprovalStatus, userDelete, userUpdate } from "../../../redux/Action/AuthAction";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
export default function Agent() {
  const dispatch = useDispatch();

  const { users } = useSelector(state => ({
    users: state?.userAuth?.users,
  }));

  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
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
      console.log(row)
    dispatch(upadateApprovalStatus(row));
    dispatch(fetchUserByRole(row?.role))
  };

  // const handleStatusUpdate = ( row )=>{
  // }

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchUserByRole(5))
  }, [])

  const userDeleteAction = (id) => {
    dispatch(userDelete(deleteId))
    dispatch(fetchUserByRole(5))
  }

  const handleShow = (id) => () => {
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
          <h1 className="page-title">Agent</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Users
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              Agent
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          {/* <Link to="#" onClick={handleClickOpen("paper")} className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add User
          </Link> */}
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
              <h3 className="card-title">Agent</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.DataTables handleStatusUpdate={handleStatusUpdate} handleOpen={handleOpen} handleShow={handleShow} userDeleteAction={userDeleteAction} handleClickOpen={handleClickOpen} users={users} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <SimpleModal role={5} editUser={editUser} open={open} scroll={scroll} handleClose={handleClose} />
      <WarningModal setShow={setShow} userDeleteAction={userDeleteAction} show={show} handleShow={handleShow} /> */}
      <UserDetailModal setShow={setShow} userDeleteAction={userDeleteAction} show={show} handleShow={handleShow} userData={userData} />

    </div>
  );
}
