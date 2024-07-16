import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse, courseDelete } from "../../../redux/Action/CourseAction";
import { WarningModal } from "../../Modal/WarningModal";
export default function Courses() {
  const dispatch = useDispatch();
  const { Courses } = useSelector((state) => ({
    Courses: state?.courses?.courses,
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
    dispatch(fetchCourse());
  }, []);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Courses</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Courses
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Course
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-course"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Courses
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Courses</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.CourseDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  Courses={Courses}
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
