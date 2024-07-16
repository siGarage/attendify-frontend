import React, { useEffect, useState } from "react";
import * as datatable from "../../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TeamLeaderModal } from "../../../Modal/TeamLeaderModal";
import { fetchUserByRole, userDelete, userListUpdate,getTeamLeader,teamLeadDelete } from "../../../../redux/Action/AuthAction";
import { WarningModal } from "../../../Modal/WarningModal";
export default function Caller() {
  const dispatch = useDispatch();

  const { users,teamLeaders } = useSelector(state => ({
    users: state?.userAuth?.users,
    // teamLeaders: state?.userAuth?.teamLeader,
    teamLeaders: state?.userAuth?.teamLeader.filter(teamleader=>teamleader.type=='Editor')
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
    dispatch(userListUpdate({ ...row, type: "user" }));
  };
  const handleOpenUserModal = (id) => {
    setShowUserProfile(true);
    setUserData(id);
  };
  useEffect(() => {
    dispatch(fetchUserByRole(2));
    dispatch(getTeamLeader());
  }, [])

  const userDeleteAction = () => {
    dispatch(teamLeadDelete(deleteId))
    .then(()=>dispatch(getTeamLeader()));
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
          <h1 className="page-title">Editor Team Lead</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Users
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              Editor
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/add_editorTeamList" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Team Leader
          </Link>
        </div>
      </div>



      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Editor Team Leader</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.EditorTeamLeaderDataTables handleStatusUpdate={handleStatusUpdate} handleOpenUserModal={handleOpenUserModal} handleOpen={handleOpen} handleShow={handleShow} userDeleteAction={userDeleteAction} handleClickOpen={handleClickOpen} teamLeaders={teamLeaders} />

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <WarningModal setShow={setShow} propertyDeleteAction={userDeleteAction} show={show} handleShow={handleShow} />
      <TeamLeaderModal setShow={setShowUserProfile} show={showUserProfile} userData={userData} />
    </div>
  );
}
