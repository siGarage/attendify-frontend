import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import face6 from "../../assets/images/profile__.png";
import face9 from "../../assets/images/faces/9.jpg";
import face11 from "../../assets/images/faces/11.jpg";
import face10 from "../../assets/images/faces/10.jpg";
import face12 from "../../assets/images/faces/12.jpg";
import face4 from "../../assets/images/faces/4.jpg";
import face7 from "../../assets/images/faces/7.jpg";
import face2 from "../../assets/images/faces/2.jpg";
import face13 from "../../assets/images/faces/13.jpg";
import face14 from "../../assets/images/faces/14.jpg";
import face15 from "../../assets/images/faces/15.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUserById } from "../../redux/Action/AuthAction";
import "../../components/Pages/profile.css";
export function RightSidebar() {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({
    users: state?.userAuth?.loginUser,
  }));

  useEffect(() => {
    dispatch(fetchLoginUserById(sessionStorage.getItem("userId")));
  }, []);

  const profileData = users?.user;

  const [rightsidebartoogle, setSidebartoogleright] = useState(true);
  function Outhover(toggle) {
    setSidebartoogleright(!toggle);
    document.querySelector(".sidebar-right").classList.remove("sidebar-open");
  }
  function getFirstLetter(str) {
    return str?.charAt(0);
  }

  return (
    <div className="sidebar sidebar-right sidebar-animate">
      <div className="panel panel-primary card mb-0 shadow-none border-0">
        <div className="tab-menu-heading border-0 d-flex p-3">
          <div className="card-title mb-0">Settings</div>
          <div className="card-options ms-auto">
            <Link
              to="#"
              className="sidebar-icon text-end float-end me-1"
              onClick={() => Outhover(rightsidebartoogle)}
            >
              <i className="fe fe-x text-white"></i>
            </Link>
          </div>
        </div>
        <div className="panel-body tabs-menu-body latest-tasks p-0 border-0">
          {/* <div className="tabs-menu border-bottom"></div> */}
          <Tabs
            defaultActiveKey="side1"
            className="nav panel-tabs tab-content rightside flex-nowrap"
            variant=""
          >
            <Tab eventKey="side1">
              <div className="tab-pane active" id="side1">
                <div className="card-body text-center">
                  <div className="dropdown user-pro-body">
                    <div className="">
                      <span className="color-letter">
                        {getFirstLetter(profileData?.email?.toUpperCase())}
                      </span>
                      {/* <span className="avatar-status profile-status bg-green"></span> */}
                    </div>
                  </div>
                </div>
                <Link
                  className="dropdown-item d-flex border-bottom border-top"
                  to={`/profile`}
                >
                  <div className="d-flex">
                    <i className="fe fe-user me-3 tx-20 text-muted"></i>
                    <div className="pt-1">
                      <h6 className="mb-0">My Profile</h6>
                      <p className="tx-12 mb-0 text-muted">
                        Profile Personal information
                      </p>
                    </div>
                  </div>
                </Link>
                {/* <Link
                  className="dropdown-item d-flex border-bottom"
                  to={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                >
                  <div className="d-flex">
                    <i className="fe fe-message-square me-3 tx-20 text-muted"></i>
                    <div className="pt-1">
                      <h6 className="mb-0">My Messages</h6>
                      <p className="tx-12 mb-0 text-muted">
                        Person message information
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex border-bottom"
                  to={`${process.env.PUBLIC_URL}/pages/mailInbox/`}
                >
                  <div className="d-flex">
                    <i className="fe fe-mail me-3 tx-20 text-muted"></i>
                    <div className="pt-1">
                      <h6 className="mb-0">My Mails</h6>
                      <p className="tx-12 mb-0 text-muted">
                        Persons mail information
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  className="dropdown-item d-flex border-bottom"
                  to={`${process.env.PUBLIC_URL}/pages/editProfile/`}
                >
                  <div className="d-flex">
                    <i className="fe fe-settings me-3 tx-20 text-muted"></i>
                    <div className="pt-1">
                      <h6 className="mb-0">Account Settings</h6>
                      <p className="tx-12 mb-0 text-muted">
                        Settings Information
                      </p>
                    </div>
                  </div>
                </Link> */}
                <Link
                  className="dropdown-item d-flex border-bottom"
                  to={`${process.env.PUBLIC_URL}/custompages/login`}
                >
                  <div className="d-flex">
                    <i className="fe fe-power me-3 tx-20 text-muted"></i>
                    <div
                      onClick={() => {
                        sessionStorage.clear();
                        window.location.reload(false);
                        window.location.href = "/";
                      }}
                      className="pt-1"
                    >
                      <h6 className="mb-0">Sign Out</h6>
                      <p className="tx-12 mb-0 text-muted">Account Signout</p>
                    </div>
                  </div>
                </Link>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
