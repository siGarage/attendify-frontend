import React from "react";
import { Link } from "react-router-dom";
import {Row,Col, Card, Form} from "react-bootstrap"
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from "../../../redux/Action/AuthAction";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required field'),
});

export default function ForgotPassword() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      dispatch(sendEmail(values));
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div onSubmit={formik.handleSubmit} className="login-img">
      <div className="page">
        <div className="dropdown float-end custom-layout">
          {/* <div
            className="demo-icon nav-link icon mt-4 bg-primary"
            onClick={() => custompagesswitcherdata.Swichermainright()}
          >
            <i className="fe fe-settings fa-spin text_primary"></i>
          </div> */}
        </div>
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
                        Forgot Password
                      </span>
                      <p className="text-muted">
                        Enter the email address registered on your account
                      </p>
                    </div>
                    <div className="pt-3" id="forgot">
                      <div className="form-group">
                        <label className="form-label">E-Mail</label>
                        <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                      {formik.errors.email && formik.touched.email ? (
                      <div className="red_color">{formik.errors.email}</div>
                    ) : null}
                      </div>
                      {/* <div className="text-end pt-1">
                    <p className="mb-0">
                      <Link
                        to={`/changePassword`}
                        className="text-primary ms-1"
                      >
                        Change Password?
                      </Link>
                    </p>
                  </div> */}
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
