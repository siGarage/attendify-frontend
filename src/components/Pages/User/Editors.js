import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByRole, userDelete, userListUpdate, userUpdate } from "../../../redux/Action/AuthAction";
import { SimpleModal } from "../../Modal/SimpleModal";
import { WarningModal } from "../../Modal/WarningModal";
export default function Editors() {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const { users } = useSelector(state => ({
    users: state?.userAuth?.users,
  }));
  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [open, setOpen] = React.useState(false);  
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [editUser,setEditUser]= useState();
  const [deleteId,setDeleteId] = useState();

  const handleClickOpen = (scrollType, row) => () => {
    setEditUser(row)
    setOpen(true);
    setScroll(scrollType);
  };

  const handleStatusUpdate = (row) => {
    dispatch(userUpdate({...row,type:"user"}))
    .then(()=>{
      dispatch(fetchUserByRole(2))
    })
    .catch(err=>console.log(err))
  };
  
  const userDeleteAction = () => {
    dispatch(userDelete(deleteId));
    dispatch(fetchUserByRole(2))
  }

  useEffect(() => {
    dispatch(fetchUserByRole(2))
  }, [])

  const handleShow = (id)  => {
    setDeleteId(id)
    setShow(true)
  };

  const handleOpen  = (id) => {
    setShow(true);
    setUserData(id);
  };

  const handleOpenUserModal  = (id) => {
    setShowUserProfile(true);
    setUserData(id);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Editors</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Users
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              Editors
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link  to="/editorAdd" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Editor
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
              <h3 className="card-title">Editors</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.EditorDataTables  handleStatusUpdate={handleStatusUpdate} handleOpenUserModal={handleOpenUserModal} handleShow={handleShow} userDeleteAction={userDeleteAction} handleOpen={handleOpen} handleClickOpen={handleClickOpen} users={users} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <SimpleModal role={2} editUser={editUser} open={open} scroll={scroll} handleClose={handleClose} /> */}
      <WarningModal setShow={setShow} propertyDeleteAction={userDeleteAction} show={show} handleShow={handleShow} />
      <UserDetailModal setShow={setShowUserProfile} show={showUserProfile} userData={userData} />
    </div>
  );
}
