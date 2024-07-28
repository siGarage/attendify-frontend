import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSemester,
  semesterDelete,
} from "../../../redux/Action/SemesterAction";
import { WarningModal } from "../../Modal/WarningModal";
import { fetchCourse } from "../../../redux/Action/CourseAction";
export default function Semesters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Courses, Semesters } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semesters: state?.semesters?.semesters,
  }));
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const [finalSemester, setFinalSemester] = useState([]);
  const [deleteId, setDeleteId] = useState();

  const handleClose = () => setShow(false);
  useEffect(() => {
    dispatch(fetchSemester());
    dispatch(fetchCourse());
    if (Semesters?.length > 0 && Courses?.length > 0) {
      const Sem = Semesters?.map((sem) => {
        return {
          ...sem,
          courseName: Courses?.filter(({ _id }) => sem.course_id === _id),
        };
      });
      if (Sem?.length > 0) {
        setFinalSemester(Sem);
      }
    } else {
      console.log("kartik");
      dispatch(fetchSemester());
    }
  }, []);
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

  const userDeleteAction = () => {
    setShow(false);
    dispatch(semesterDelete(deleteId));
    setFinalSemester(finalSemester.filter((item) => item._id !== deleteId));
  };

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Phase</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
            Phases
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Phase
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-semester"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Phase
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Phases</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <datatable.SemesterDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleClickOpen={handleClickOpen}
                  Semesters={finalSemester}
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
