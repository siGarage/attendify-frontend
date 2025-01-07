import React, { useEffect, useState } from "react";
import "../../../App.css";
import { Col, Row, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { permission, fetchUserByRole } from "../../../redux/Action/AuthAction";
import ReactSwitch from "react-switch";

export default function Permission() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { users } = useSelector((state) => ({
    users: state?.userAuth?.users?.users?.filter(
      (item) => item?._id == params.id
    ),
  }));
  useEffect(() => {
    if (users?.length == 0) {
      dispatch(fetchUserByRole(3));
    }
  }, []);
  const [universityCreate, setUniversityCreate] = useState(
    users[0]?.permissions?.universityCreate
  );
  const [collegeCreate, setCollegeCreate] = useState(
    users[0]?.permissions?.collegeCreate
  );
  const [statusCreate, setStatusCreate] = useState(
    users[0]?.permissions?.statusCreate
  );
  const [categoryCreate, setCategoryCreate] = useState(
    users[0]?.permissions?.categoryCreate
  );
  const [propertyTypeCreate, setPropertyTypeCreate] = useState(
    users[0]?.permissions?.propertyTypeCreate
  );
  const [universityView, setUniversityView] = useState(
    users[0]?.permissions?.universityView
  );
  const [collegeView, setCollegeView] = useState(
    users[0]?.permissions?.collegeView
  );
  const [statusView, setStatusView] = useState(
    users[0]?.permissions?.statusView
  );
  const [categoryView, setCategoryView] = useState(
    users[0]?.permissions?.categoryView
  );
  const [proprtyTypeView, setPropertyTypeView] = useState(
    users[0]?.permissions?.proprtyTypeView
  );
  const [universityUpate, setUniversityUpate] = useState(
    users[0]?.permissions?.universityUpate
  );
  const [collegeUpate, setCollegeUpate] = useState(
    users[0]?.permissions?.collegeUpate
  );
  const [statusUpate, setStatusUpate] = useState(
    users[0]?.permissions?.statusUpate
  );
  const [categoryUpate, setCategoryUpate] = useState(
    users[0]?.permissions?.categoryUpate
  );
  const [propertyTypeUpate, setPropertyTypeUpate] = useState(
    users[0]?.permissions?.propertyTypeUpate
  );
  const [universityDelete, setUniversityDelete] = useState(
    users[0]?.permissions?.universityDelete
  );
  const [collegeDelete, setCollegeDelete] = useState(
    users[0]?.permissions?.collegeDelete
  );
  const [statusDelete, setStatusDelete] = useState(
    users[0]?.permissions?.statusDelete
  );
  const [categoryDelete, setCategoryDelete] = useState(
    users[0]?.permissions?.categoryDelete
  );
  const [propertyTypeDelete, setPropertyTypeDelete] = useState(
    users[0]?.permissions?.propertyTypeDelete
  );
  const handleSetUniversityCreate = (val) => {
    setUniversityCreate(val);
  };
  const handleSetUniversityView = (val) => {
    setUniversityView(val);
  };
  const handleSetStatusView = (val) => {
    setStatusView(val);
  };
  const handleSetUniversityUdpate = (val) => {
    setUniversityUpate(val);
  };
  const handleSetStatusUdpate = (val) => {
    setStatusUpate(val);
  };
  const handleSetUniversityDelete = (val) => {
    setUniversityDelete(val);
  };
  const handleSetStatusDelete = (val) => {
    setStatusDelete(val);
  };
  const handleSetCollegeCreate = (val) => {
    setCollegeCreate(val);
  };
  const handleSetProprtyTypeCreate = (val) => {
    setPropertyTypeCreate(val);
  };
  const handleSetStatusCreate = (val) => {
    setStatusCreate(val);
  };
  const handleSetCategoryCreate = (val) => {
    setCategoryCreate(val);
  };
  const handleSetCollegeView = (val) => {
    setCollegeView(val);
  };
  const handleSetPropertyTypeView = (val) => {
    setPropertyTypeView(val);
  };
  const handleSetCategoryView = (val) => {
    setCategoryView(val);
  };
  const handleSetCollegeUdpate = (val) => {
    setCollegeUpate(val);
  };
  const handleSetCategoryUdpate = (val) => {
    setCategoryUpate(val);
  };
  const handleSetPropertyTypeUdpate = (val) => {
    setPropertyTypeUpate(val);
  };
  const handleSetCollegeDelete = (val) => {
    setCollegeDelete(val);
  };
  const handleSetCategoryDelete = (val) => {
    setCategoryDelete(val);
  };
  const handleSetPropertyTypeDelete = (val) => {
    setPropertyTypeDelete(val);
  };
  let onSubmit = () => {
    let data = {
      userId: params?.id,
      universityCreate: universityCreate,
      collegeCreate: collegeCreate,
      statusCreate: statusCreate,
      categoryCreate: categoryCreate,
      propertyTypeCreate: propertyTypeCreate,
      universityView: universityView,
      collegeView: collegeView,
      statusView: statusView,
      categoryView: categoryView,
      proprtyTypeView: proprtyTypeView,
      universityUpate: universityUpate,
      collegeUpate: collegeUpate,
      statusUpate: statusUpate,
      categoryUpate: categoryUpate,
      propertyTypeUpate: propertyTypeUpate,
      universityDelete: universityDelete,
      collegeDelete: collegeDelete,
      statusDelete: statusDelete,
      categoryDelete: categoryDelete,
      propertyTypeDelete: propertyTypeDelete,
    };
    navigate(-1);
    dispatch(permission(data));
    // window.location.href = '/caller';
  };
  return (
    <div>
      {/* <form onSubmit={formik.handleSubmit}> */}
      <Row className=" row-sm">
        <Col lg={12} xl={12} md={12} sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h3">Permission</Card.Title>
            </Card.Header>
            <Col sm={12} lg={12} md={12} xl={12}>
              <Card>
                <Row>
                  {/* <form> */}

                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Create</th>
                      <th>View</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                    <tr>
                      <td>University Property</td>
                      <td>
                        <ReactSwitch
                          checked={universityCreate}
                          onChange={handleSetUniversityCreate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={universityView}
                          onChange={handleSetUniversityView}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={universityUpate}
                          onChange={handleSetUniversityUdpate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={universityDelete}
                          onChange={handleSetUniversityDelete}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>College Property</td>
                      <td>
                        <ReactSwitch
                          checked={collegeCreate}
                          onChange={handleSetCollegeCreate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={collegeView}
                          onChange={handleSetCollegeView}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={collegeUpate}
                          onChange={handleSetCollegeUdpate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={collegeDelete}
                          onChange={handleSetCollegeDelete}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        <ReactSwitch
                          checked={statusCreate}
                          onChange={handleSetStatusCreate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={statusView}
                          onChange={handleSetStatusView}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={statusUpate}
                          onChange={handleSetStatusUdpate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={statusDelete}
                          onChange={handleSetStatusDelete}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>
                        <ReactSwitch
                          checked={categoryCreate}
                          onChange={handleSetCategoryCreate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={categoryView}
                          onChange={handleSetCategoryView}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={categoryUpate}
                          onChange={handleSetCategoryUdpate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={categoryDelete}
                          onChange={handleSetCategoryDelete}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Property Type</td>
                      <td>
                        <ReactSwitch
                          checked={propertyTypeCreate}
                          onChange={handleSetProprtyTypeCreate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={proprtyTypeView}
                          onChange={handleSetPropertyTypeView}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={propertyTypeUpate}
                          onChange={handleSetPropertyTypeUdpate}
                        />
                      </td>
                      <td>
                        <ReactSwitch
                          checked={propertyTypeDelete}
                          onChange={handleSetPropertyTypeDelete}
                        />
                      </td>
                    </tr>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger mt-2 me-2 "
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary mt-2 "
                      onClick={() => onSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                  {/* </form> */}
                </Row>
              </Card>
            </Col>
          </Card>
        </Col>
      </Row>
      {/* </form> */}
    </div>
  );
}
