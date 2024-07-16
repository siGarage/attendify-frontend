import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse, courseDelete } from "../../../redux/Action/CourseAction";
import { fetchGroups } from "../../../redux/Action/GroupAction";
import { WarningModal } from "../../Modal/WarningModal";
export default function Groups() {
  const dispatch = useDispatch();
  const { GroupsList } = useSelector((state) => ({
    GroupsList: state?.groups?.groups,
  }));
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();

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
    dispatch(courseDelete(deleteId));
    dispatch(fetchCourse());
  };

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Groups</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Groups
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Group
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-group"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Groups
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Groups</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.GroupsDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  Groups={GroupsList}
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
    </div>
  );
}
