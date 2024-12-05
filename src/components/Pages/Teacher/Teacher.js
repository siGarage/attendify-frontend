import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb, Button } from "react-bootstrap";
import { UserDetailModal } from "../../Modal/UserDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  fetchTeachers,
  teacherDelete,
} from "../../../redux/Action/TeacherAction";
import { fetchDepartment } from "../../../redux/Action/DepartmentAction";
import { WarningModal } from "../../Modal/WarningModal";
import { fetchBiometric } from "../../../redux/Action/BiometricAction";
export default function Teachers() {
  const dispatch = useDispatch();
  const { teachers, Departments, bios } = useSelector((state) => ({
    users: state?.userAuth?.users,
    exams: state?.exam?.exams,
    teachers: state?.teachers?.teachers,
    Departments: state?.departments?.departments,
    bios: state?.bios?.bio,
  }));
  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const [finalTeacher, setFinalTeacher] = useState([]);
  const [mergeBiometricList, setMergeBiometricList] = useState([]);
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
  function mergeArrays(filteredData, bios) {
    const mergedArray = [];
    filteredData.forEach((teacher) => {
      const matchingTeacher = bios.find(
        (item) => item?.user_id == teacher?._id
      );
      if (matchingTeacher) {
        mergedArray.push({ ...teacher, ...matchingTeacher });
      } else {
        mergedArray.push(teacher);
      }
    });
    return mergedArray;
  }
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDepartment());
    dispatch(fetchBiometric());
  }, []);
  useEffect(() => {
    if (teachers.length > 0 && bios.length > 0) {
      const Tea = teachers?.map((tea) => {
        return {
          ...tea,
          teacher_id: tea._id,
          departmentName: Departments?.filter(
            (d) => tea?.department_id === d?._id
          ),
        };
      });
      if (Tea?.length > 0) {
        let dataFinal = mergeArrays(Tea, bios);
        setMergeBiometricList(dataFinal);
      }
    } else {
      dispatch(fetchTeachers());
      dispatch(fetchDepartment());
      dispatch(fetchBiometric());
    }
  }, [Departments, teachers]);
  const userDeleteAction = () => {
    setShow(false);
    dispatch(teacherDelete(deleteId));
    dispatch(fetchTeachers());
  };

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

  const formik = useFormik({
    initialValues: {
      department_id: "",
    },
    onSubmit: (values) => {
      let searchData = mergeBiometricList?.filter(
        (fd) => fd?.department_id == values?.department_id
      );
      setFinalTeacher(searchData);
    },
  });

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
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card className="removeShadow">
                  <form onSubmit={formik.handleSubmit}>
                    <Row>
                      <div className="row">
                        <Col sm={12} lg={3} md={3} xl={3}>
                          <label className="form-label">Department</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.department_id}
                            className="form-control required"
                            name="department_id"
                            id="department_id"
                          >
                            <option value="">Please Select Department</option>
                            {Departments?.length > 0
                              ? Departments?.map((d) => {
                                  return (
                                    <option value={d?._id}>
                                      {d?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </Col>
                      </div>
                      <div className="d-flex justify-content-start">
                        <Button
                          type="submit"
                          variant="primary"
                          className="me-1 mt-5"
                        >
                          Search
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          className="me-1 mt-5"
                          onClick={() => {
                            formik.resetForm();
                            setFinalTeacher([...mergeBiometricList]);
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </Row>
                  </form>
                </Card>
              </Col>
              <div className="table-responsive">
                <datatable.TeacherDataTables
                  handleStatusUpdate={handleStatusUpdate}
                  handleOpenUserModal={handleOpenUserModal}
                  handleShow={handleShow}
                  userDeleteAction={userDeleteAction}
                  handleOpen={handleOpen}
                  handleClickOpen={handleClickOpen}
                  Teachers={
                    finalTeacher?.length > 0 ? finalTeacher : mergeBiometricList
                  }
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
