import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../redux/Action/AuthAction";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Your email is invalid!').required('Email field is required!'),
  password: Yup.string().required('Password field is required!')
});

export default function Login() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '', 
      password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      dispatch(login(values));
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div onSubmit={formik.handleSubmit} className="login-img">
      <div className="page">
     
        {/* <div className="" onClick={()=>custompagesswitcherdata.Swichermainrightremove()}> */}
        <div className="" >
          <div className="col col-login mx-auto">
            <div className="text-center">
              <img
                src={require("../../../assets/images/mainlogo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <form className="login100-form validate-form">
                  <span className="login100-form-title">Login</span>
                  <div className="wrap-input100 validate-input">
                  <input
                      className="input100"
                      // autocomplete="off"
                      type="text"
                      name="email"
                      placeholder="Email"                      
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                   
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                      <div className="red_color">{formik.errors.email}</div>
                    ) : null}
                  <div className="wrap-input100 validate-input">
                  <input
                      className="input100"
                      type="password"
                      name="password"
                      onBlur={formik.handleBlur}
                      password="true"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      // autocomplete="off"
                      placeholder="Password"
                    />
                   
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
              
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                      <div className="red_color">{formik.errors.password}</div>
                    ) : null}
                  <div className="text-end pt-1">
                    <p className="mb-0">
                      <Link
                        to={`/forgotPassword`}
                        className="text-primary ms-1"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                  <div className="container-login100-form-btn">
                    <button
                     // to={`${process.env.PUBLIC_URL}/dashboard/`}
                     type="submit"
                      className="login100-form-btn btn-primary"
                      onClick={formik.handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  {/* <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Not a member?
                      <Link
                        to={`/register`}
                        className="text-primary ms-1"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div> */}
                </form>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
