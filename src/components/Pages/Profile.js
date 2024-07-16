import React, { useEffect, useState } from "react";
import user8 from "../../assets/images/profile__.png";
import { Tabs, Tab, Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./profile.css";
import {
  fetchLoginUserById,
  fetchUserById,
  userUpdate,
} from "../../redux/Action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/images/profile.jpg";
// import { EditProfileModal } from "../../Modal/EditProfileModal";
import parse from "html-react-parser";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [editUser, setEditUser] = useState();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state?.userAuth?.loginUser,
  }));

  const handleClickOpen = (scrollType, row) => () => {
    setEditUser({
      _id: sessionStorage.getItem("_id") || "",
      name: sessionStorage.getItem("name") || "",
      email: sessionStorage.getItem("email") || "",
      contact_no: sessionStorage.getItem("contact_no") || "",
      description: sessionStorage.getItem("description") || "",
      alt_contact: sessionStorage.getItem("alt_contact") || "",
      cafename: sessionStorage.getItem("name") || "",
      cafecity: sessionStorage.getItem("name") || "",
      role: sessionStorage.getItem("role"),
    });
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchLoginUserById(sessionStorage.getItem("userId")));
  }, []);

  const profileData = users?.user;

  const handleUpdateProfile = (profileData) => {
    let formData = new FormData();
    for (let value in profileData) {
      formData.append(value, profileData[value]);
    }

    dispatch(userUpdate(profileData?._id, formData)).then((data) => {
      if (data != undefined) {
        sessionStorage.setItem("image", data?.image);
        window.location.reload();
        dispatch(fetchUserById(profileData?.role));
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Pages
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Profile
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row id="user-profile">
        <Col lg={6} md={6} xl={6} sm={12}>
          <Card className="bg-transparent shadow-none border-0">
            <Card.Body className="bg-white small-radius">
              <div className="wideget-user">
                <Row>
                  <Col lg={3} md={3} xl={3} sm={12}>
                    <img
                      className="rounded"
                      src={profile}
                      width={100}
                      height={100}
                    />
                  </Col>
                  <Col lg={9} md={9} xl={9} sm={12} xs={12}>
                    <Row>
                      <Col>
                        <h4 className="mb-0">
                          <strong>Kritika Rana</strong>
                        </h4>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <h4 className="mb-0">
                          <strong>7</strong>
                        </h4>
                      </Col>
                    </Row>
                    <Row className="border-bottom border-dark">
                      <Col>1234567</Col>
                      <Col className="d-flex justify-content-end">MBBS</Col>
                    </Row>
                    <Row>
                      <Col className="p-4 mt-2 border-end border-dark">
                        <p className="mb-0">
                          <strong>Born:</strong>&nbsp;2000.03.11
                        </p>
                        <p className="mb-0">
                          <strong>Gender:</strong>Male
                        </p>
                        <p className="mb-0">
                          <strong>Race:</strong>&nbsp;White
                        </p>
                        <p className="mb-0">
                          <strong>Ethnicity:</strong>&nbsp;Hispanic
                        </p>
                      </Col>
                      <Col className="p-4 mt-2">
                        <p className="mb-0">
                          <strong>Gifted:</strong>&nbsp;N
                        </p>
                        <p className="mb-0">
                          <strong>ELL:</strong>Never Ell
                        </p>
                        <p className="mb-0">
                          <strong>SWD:</strong>&nbsp;
                        </p>
                        <p className="mb-0">
                          <strong>504:</strong>&nbsp;
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={3} xl={63} sm={12}>
          <Card className="bg-transparent shadow-none border-0">
            <Card.Body className="bg-white small-radius">
              <div className="wideget-user">
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    xl={12}
                    sm={12}
                    className="border-bottom border-dark"
                  >
                    <h4>
                      <strong>Attendence</strong>
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    className="mt-2 border-end border-dark"
                  >
                    <h3 className="text-success mt-7 mb-5">
                      <strong>98.11%</strong>
                    </h3>
                  </Col>
                  <Col
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    className="mt-2 border-dark text-center"
                  >
                    <h5 className="text-warning mt-5 mb-0 ">
                      <strong>2.5</strong>
                    </h5>
                    <h6 className="mt-0">Absent</h6>
                    <h5 className="text-warning mt-5 mb-0 ">
                      <strong>0</strong>
                    </h5>
                    <h6 className="mt-0">Tandy</h6>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={3} xl={63} sm={12}>
          <Card className="bg-transparent shadow-none border-0">
            <Card.Body className="bg-white small-radius">
              <div className="wideget-user">
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    xl={12}
                    sm={12}
                    className="border-bottom border-dark"
                  >
                    <h4>
                      <strong>Referrals</strong>
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    className="mt-2 border-end border-dark"
                  >
                    <h3 className="text-success mt-7 mb-5">
                      <strong>0</strong>
                    </h3>
                  </Col>
                  <Col
                    lg={6}
                    md={6}
                    xl={6}
                    sm={6}
                    className="mt-2 border-dark text-center"
                  >
                    <h5 className="text-warning mt-5 mb-0 ">
                      <strong>0</strong>
                    </h5>
                    <h6 className="mt-0">Minor</h6>
                    <h5 className="text-warning mt-5 mb-0 ">
                      <strong>0</strong>
                    </h5>
                    <h6 className="mt-0">Major</h6>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <EditProfileModal profile="profile" role={sessionStorage.getItem("role")} editUser={profileData} open={open} scroll={scroll} handleClose={handleClose} /> */}
      {/* <UserDetailModal/> */}
    </div>
  );
}
