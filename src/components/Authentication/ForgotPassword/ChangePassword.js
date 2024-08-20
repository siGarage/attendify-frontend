import React from "react";
import { Link } from "react-router-dom";
import {Row,Col, Card, Form} from "react-bootstrap"
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changePass, changePassDone, resetPass } from "../../../redux/Action/AuthAction";

const SignupSchema = Yup.object().shape({
 // email: Yup.string().email('Invalid email').required('Required'),
});

export default function ChangePassword() {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      "new_password": "",
      "confirm_password": "",
      "userId":window.location.pathname.split("/")[2]
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      dispatch(changePassDone(values));
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div onSubmit={formik.handleSubmit} className="login-img">
      <div className="page">
        {/* <div className="dropdown float-end custom-layout">
          <div
            className="demo-icon nav-link icon mt-4 bg-primary"
            onClick={() => custompagesswitcherdata.Swichermainright()}
          >
            <i className="fe fe-settings fa-spin text_primary"></i>
          </div>
        </div> */}
        <div className="">
          <div
            className="col col-login mx-auto"
            onClick={() => custompagesswitcherdata.Swichermainrightremove()}
          >
            <div className="text-center">
              <img
                src={require("../../../assets/images/mainlogo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
          </div>
          <div className="container-login100">
            <Row>
              <Col className=" col-login mx-auto">
                <Form className="card shadow-none" method="post">
                  <Card.Body>
                    <div className="text-center">
                      <span className="login100-form-title">
                        Change Password
                      </span>
                      <p className="text-muted">
                        Enter the email address registered on your account
                      </p>
                    </div>
                    <div className="pt-3" id="forgot">
                 
                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                      className="input100"
                      type="password"
                      name="new_password"
                      placeholder="New Password"                      
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.new_password}
                    />
                      {formik.errors.new_password && formik.touched.new_password ? (
                      <div className="red_color">{formik.errors.new_password}</div>
                    ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                      className="input100"
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                    />
                      {formik.errors.confirm_password && formik.touched.confirm_password ? (
                      <div>{formik.errors.confirm_password}</div>
                    ) : null}
                      </div>
                      <div className="submit">
                        <button type="submit"
                          //to={`${process.env.PUBLIC_URL}/dashboard/`}
                          className="btn btn-primary d-grid"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="text-center mt-4">
                        <p className="text-dark mb-0">
                          Forgot It?
                          <Link className="text-primary ms-1" to="/">
                            Send me Back
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    {/* <div className="d-flex justify-content-center my-3">
                      <Link to="#" className="social-login  text-center me-4">
                        <i className="fa fa-google"></i>
                      </Link>
                      <Link to="#" className="social-login  text-center me-4">
                        <i className="fa fa-facebook"></i>
                      </Link>
                      <Link to="#" className="social-login  text-center">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </div> */}
                  </Card.Footer>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
