import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubject,
  subjectDelete,
} from "../../../redux/Action/SubjectAction";
import { WarningModal } from "../../Modal/WarningModal";
export default function Subjects() {
  const dispatch = useDispatch();
  const { Subjects } = useSelector((state) => ({
    Subjects: state?.subjects?.subjects,
  }));
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
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
    dispatch(subjectDelete(deleteId));
    dispatch(fetchSubject());
  };

  useEffect(() => {
    dispatch(fetchSubject());
  }, []);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Subjects</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Subjects
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Subject
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-subject"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Subjects
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Subjects</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.SubjectDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleClickOpen={handleClickOpen}
                  Subjects={Subjects}
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
