import React, { useEffect } from "react";
import { Dropdown, Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changePass,
  fetchLoginUserById,
  fetchUserById,
} from "../../redux/Action/AuthAction";
// import user8 from "../../../assets/images/profile__.png";
import user8 from "../../assets/images/profile__.png";
import "../../components/Pages/profile.css";

export function Header() {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({
    users: state?.userAuth?.loginUser,
  }));

  useEffect(() => {
    dispatch(fetchLoginUserById(sessionStorage.getItem("userId")));
  }, []);

  const profileData = users?.user;

  //full screen
  function Fullscreen() {
    if (
      (document.fullScreenElement && document.fullScreenElement === null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  //dark-mode
  const Darkmode = () => {
    document.querySelector(".app").classList.toggle("dark-mode");
  };
  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector(".app").classList.toggle("sidenav-toggled");
  };
  //rightsidebar
  const openCloseSidebarright = () => {
    document.querySelector(".sidebar-right").classList.toggle("sidebar-open");
  };

  // responsivesearch
  const responsivesearch = () => {
    document.querySelector(".header-search").classList.toggle("show");
  };
  //swichermainright
  const swichermainright = () => {
    document.querySelector(".demo_changer").classList.toggle("active");
    document.querySelector(".demo_changer").style.right = "0px";
  };
  function getFirstLetter(str) {
    return str?.charAt(0);
  }
  return (
    <Navbar expand="md" className="app-header header sticky">
      <Container fluid className="main-container">
        <div className="d-flex align-items-center">
          <Link
            aria-label="Hide Sidebar"
            className="app-sidebar__toggle"
            to="#"
            onClick={() => openCloseSidebar()}
          ></Link>
          <div className="responsive-logo">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/`}
              className="header-logo"
            >
              <img
                src={require("../../assets/images/mainlogo.png")}
                className="mobile-logo logo-1"
                id="ams_logos"
                alt="logo"
              />
              <img
                src={require("../../assets/images/mainlogo.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <Link
            className="logo-horizontal "
            to={`${process.env.PUBLIC_URL}/dashboard/`}
          >
            <img
              src={require("../../assets/images/mainlogo.png")}
              className="header-brand-img desktop-logo"
              alt="logo"
            />
            <img
              src={require("../../assets/images/mainlogo.png")}
              className="header-brand-img light-logo1"
              alt="logo"
            />
          </Link>

          <div className="d-flex order-lg-2 ms-auto header-right-icons">
            <Navbar.Toggle
              aria-controls="navbarScroll"
              className="navresponsive-toggler d-lg-none ms-auto"
              type="button"
            >
              <span className="navbar-toggler-icon fe fe-more-vertical text-dark"></span>
            </Navbar.Toggle>

            <div className="navbar navbar-collapse responsive-navbar p-0">
              <Navbar.Collapse
                className="navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <div className="d-flex order-lg-2">
                  <div className="dropdown d-block d-lg-none">
                    <Link
                      to="#"
                      className="nav-link icon"
                      onClick={() => responsivesearch()}
                    >
                      <i className="fe fe-search"></i>
                    </Link>
                    <div className="dropdown-menu header-search dropdown-menu-start">
                      <div className="input-group w-100 p-2 border">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search...."
                        />
                        <div className="input-group-text btn btn-primary">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="dropdown d-md-flex">
                    <Link
                      to="#"
                      className="nav-link icon theme-layout nav-link-bg layout-setting"
                      onClick={() => Darkmode()}
                    >
                      <span className="dark-layout">
                        <i className={`fe ${"fe-moon"}`}></i>
                      </span>
                      <span className="light-layout">
                        <i className={`fe ${"fe-sun"}`}></i>
                      </span>
                    </Link>
                  </div> */}
                  <div className="dropdown d-md-flex">
                    <Link
                      to="#"
                      className="nav-link icon full-screen-link nav-link-bg"
                      onClick={Fullscreen}
                    >
                      <i className="fe fe-minimize fullscreen-button"></i>
                    </Link>
                  </div>
                  {/* <Dropdown className="d-md-flex notifications">
                    <Dropdown.Toggle className="nav-link icon " variant="">
                      <i className="fe fe-bell"></i>
                      <span className=" pulse"></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className=" dropdown-menu-end dropdown-menu-arrow "
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading border-bottom">
                        <div className="d-flex">
                          <h6 className="mt-1 mb-0 fs-16 fw-semibold">
                            You have Notification
                          </h6>
                          <div className="ms-auto">
                            <span className="badge bg-success rounded-pill">
                              3
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="notifications-menu">
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <div className="me-3 notifyimg  bg-primary-gradient brround box-shadow-primary">
                            <i className="fe fe-message-square"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New review received
                            </h5>
                            <span className="notification-subtext">
                              2 hours ago
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <div className="me-3 notifyimg  bg-secondary-gradient brround box-shadow-primary">
                            <i className="fe fe-mail"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New Mails Received
                            </h5>
                            <span className="notification-subtext">
                              1 week ago
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart/`}
                        >
                          <div className="me-3 notifyimg  bg-success-gradient brround box-shadow-primary">
                            <i className="fe fe-shopping-cart"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New Order Received
                            </h5>
                            <span className="notification-subtext">
                              1 day ago
                            </span>
                          </div>
                        </Dropdown.Item>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Link
                        to="#"
                        className=" dropdown-item text-center p-3 text-muted"
                      >
                        View all Notification
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  {/* <Dropdown className="dropdown d-md-flex message">
                    <Dropdown.Toggle
                      className="nav-link icon text-center d-flex"
                      variant=""
                    >
                      <i className="fe fe-message-square"></i>
                      <span className=" pulse-danger"></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading border-bottom">
                        <div className="d-flex">
                          <h6 className="mt-1 mb-0 fs-16 fw-semibold">
                            You have Messages
                          </h6>
                          <div className="ms-auto">
                            <span className="badge bg-danger rounded-pill">
                              4
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="message-menu">
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <img
                            alt=""
                            className="avatar avatar-md brround me-3 cover-image"
                            src={require("../../assets/images/users/1.jpg")}
                          />
                          <div className="wd-90p">
                            <div className="d-flex">
                              <h5 className="mb-1">Madeleine</h5>
                              <small className="text-muted ms-auto text-end">
                                3 hours ago
                              </small>
                            </div>
                            <span>Hey! there I' am available....</span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <img
                            alt=""
                            className="avatar avatar-md brround me-3 cover-image"
                            src={require("../../assets/images/users/2.jpg")}
                          />
                          <div className="wd-90p">
                            <div className="d-flex">
                              <h5 className="mb-1">Anthony</h5>
                              <small className="text-muted ms-auto text-end">
                                5 hour ago
                              </small>
                            </div>
                            <span>New product Launching...</span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <img
                            alt=""
                            className="avatar avatar-md brround me-3 cover-image"
                            src={require("../../assets/images/users/4.jpg")}
                          />
                          <div className="wd-90p">
                            <div className="d-flex">
                              <h5 className="mb-1">Olivia</h5>
                              <small className="text-muted ms-auto text-end">
                                45 mintues ago
                              </small>
                            </div>
                            <span>New Schedule Realease......</span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <img
                            alt=""
                            className="avatar avatar-md brround me-3 cover-image"
                            src={require("../../assets/images/users/15.jpg")}
                          />
                          <div className="wd-90p">
                            <div className="d-flex">
                              <h5 className="mb-1">Sanderson</h5>
                              <small className="text-muted ms-auto text-end">
                                2 days ago
                              </small>
                            </div>
                            <span>New Schedule Realease......</span>
                          </div>
                        </Dropdown.Item>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Link
                        to="#"
                        className=" dropdown-item text-center p-3 text-muted"
                      >
                        See all Messages
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <Dropdown className=" d-md-flex profile-1">
                    {/* <Dropdown.Toggle
                      className="nav-link profile leading-none d-flex px-1"
                      variant=""
                    > */}
                    <span>
                      {/* {
                        sessionStorage.getItem("image") != "undefined" ? */}
                      {/* <img className="profileImgSmall" crossorigin="anonymous" src={user8} alt="img" /> : */}
                      {/* <img
                          src={user8}
                          alt="profile-user"
                          className="avatar  profile-user brround cover-image"
                        /> */}
                      {/* } */}
                      {/* {console.log(typeof(profileData?.email))} */}
                      <span className="color-letter">
                        {getFirstLetter(profileData?.email?.toUpperCase())}
                      </span>
                    </span>
                    {/* </Dropdown.Toggle> */}
                    <Dropdown.Menu
                      className="dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading">
                        <div className="text-center">
                          <h5 className="text-dark mb-0">
                            {profileData?.name}
                          </h5>
                          {/* <small className="text-muted">
                            {sessionStorage.getItem("role") == "0"
                              ? "User"
                              : sessionStorage.getItem("role") == "1"
                              ? "Admin"
                              : sessionStorage.getItem("role") == "2"
                              ? "Editor"
                              : sessionStorage.getItem("role") == "3"
                              ? "Caller"
                              : sessionStorage.getItem("role") == "4"
                              ? "Cyber Partner"
                              : "Superadmin"}
                          </small> */}
                        </div>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Dropdown.Item
                      // href={`/profile`}
                      >
                        <Link to="/profile">
                          <i className="dropdown-icon fe fe-user"></i> Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                      // href={`/profile`}
                      >
                        <Link onClick={() => dispatch(changePass())}>
                          <i className="dropdown-icon fe fe-user"></i> Change
                          Password
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/mailInbox/`}
                      >
                        <i className="dropdown-icon fe fe-mail"></i> Inbox
                        <span className="badge bg-secondary float-end">3</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/mailCompose/`}
                      >
                        <i className="dropdown-icon fe fe-settings"></i>
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        href={`${process.env.PUBLIC_URL}/pages/faqs/`}
                      >
                        <i className="dropdown-icon fe fe-alert-triangle"></i>
                        Need help?p??
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          sessionStorage.clear();
                          window.location.reload(false);
                          window.location.href = "/login";
                        }}
                        href={`${process.env.PUBLIC_URL}/custompages/login/`}
                      >
                        <i className="dropdown-icon fe fe-alert-circle"></i>
                        Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="dropdown d-md-flex header-settings">
                    <Link
                      to="#"
                      className="nav-link icon "
                      onClick={() => openCloseSidebarright()}
                    >
                      <i className="fe fe-menu"></i>
                    </Link>
                  </div>
                </div>
              </Navbar.Collapse>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
