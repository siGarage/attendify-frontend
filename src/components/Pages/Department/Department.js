import React, { useEffect, useState } from "react";
import * as datatable from "../../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../../redux/Action/TeacherAction";
import {
  fetchDepartment,
  departmentDelete,
} from "../../../redux/Action/DepartmentAction";
import { WarningModal } from "../../Modal/WarningModal";
export default function Departemnt() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [finalDepartment, setFinalDepartment] = useState([]);
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDepartment());
  }, []);
  const { Departments, teachers } = useSelector((state) => ({
    Departments: state?.departments?.departments,
    teachers: state?.teachers?.teachers,
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
  useEffect(() => {
    const Dep = Departments?.map((dep) => {
      return {
        ...dep,
        TeacherName: teachers?.filter(({ _id }) => dep.hod === _id),
      };
    });
    if (Dep?.length > 0) {
      setFinalDepartment(Dep);
    }
  }, [teachers, Departments]);
  const userDeleteAction = () => {
    dispatch(departmentDelete(deleteId));
    setShow(false);
    navigate("/department-list");
  };

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Departments</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Departments
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Department
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/add-department"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Departments
          </Link>
        </div>
      </div>
      <Row className=" row-sm">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h3 className="card-title">Departments</h3>
            </Card.Header>
            <Card.Body>
              {finalDepartment.length !== 0 ? (
                <div className="table-responsive">
                  <datatable.DepartmentDataTables
                    handleStatusUpdate={handleStatusUpdate}
                    handleShow={handleShow}
                    Departments={finalDepartment}
                  />
                </div>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <WarningModal
        setShow={setShow}
        propertyDeleteAction={userDeleteAction}
        show={show}
        handleShow={handleShow}
      />
    </div>
  );
}
