import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  fetchSubject,
  subjectDelete,
} from "../../../redux/Action/SubjectAction";
import { fetchSemester } from "../../../redux/Action/SemesterAction";
import { WarningModal } from "../../Modal/WarningModal";
import { ContactlessOutlined } from "@mui/icons-material";
export default function Subjects() {
  const dispatch = useDispatch();
  const { Subjects, Semesters } = useSelector((state) => ({
    Subjects: state?.subjects?.subjects,
    Semesters: state?.semesters?.semesters,
  }));
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [finalSubject, setFinalSubject] = React.useState([]);
  // const [semesterId, setSemesterId] = React.useState("");
  const [editUser, setEditUser] = useState();
  const [deleteId, setDeleteId] = useState();

  const handleClickOpen = (scrollType, row) => () => {
    setEditUser(row);
    setOpen(true);
    setScroll(scrollType);
  };
  const setSemesterId = (event) => {
    const newValue = event.target.value;
    let finalData = Subjects?.filter((s) => s.semester_id == newValue);
    setFinalSubject(finalData);
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
    dispatch(fetchSemester());
  }, []);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     semester_id: "",
  //   },
  //   onSubmit: (values) => {
  //     setSemesterId(values.semester_id);
  //   },
  // });
  // useEffect(() => {
  //   let finalData = Subjects?.filter((s) => s.semester_id == semesterId);
  //   console.log(finalData);
  // }, [semesterId.length > 0]);
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
        <Col sm={12} lg={12} md={12} xl={12}>
          <Card className="removeShadow">
            <Row className="p-3">
              <div className="row">
                <Col sm={12} lg={3} md={3} xl={3}>
                  <label className="form-label">Phase</label>
                  <select
                    onChange={setSemesterId}
                    className="form-control required"
                    name="course_id"
                    id="course_id"
                  >
                    <option value="">Please Select Phase</option>
                    {Semesters?.length > 0
                      ? Semesters?.map((course) => {
                          return (
                            <option value={course?._id}>{course?.name}</option>
                          );
                        })
                      : ""}
                  </select>
                </Col>
              </div>
            </Row>
          </Card>
        </Col>
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
                  Subjects={finalSubject}
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
