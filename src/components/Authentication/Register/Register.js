import React from "react";
import { Card } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../../redux/Action/AuthAction";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  contact_no: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

export default function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password:""
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      dispatch(register(values,"register"));
      navigate("/");
    },
  });
  return (
    <div onSubmit={formik.handleSubmit} className="login-img">
      <div className="page">
    
        {/* <div className="" onClick={() => custompagesswitcherdata.Swichermainrightremove()}> */}
        <div>
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
                  <span className="login100-form-title">Registration</span>
                  <div
                    className="wrap-input100 validate-input"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="name"
                      placeholder="User name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="mdi mdi-account" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="text"
                      name="phone"
                      placeholder="Contact Number"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                      <div>{formik.errors.phone}</div>
                    ) : null}
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="icon icon-phone"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="password"
                      name="password"
                      password="true"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"

                  >
                    <input
                      className="input100"
                      type="password"
                      name="confirm_password"
                      password="true"
                      placeholder="Confirm-Password"
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                    />
                    {formik.errors.confirm_password && formik.touched.confirm_password ? (
                      <div>{formik.errors.confirm_password}</div>
                    ) : null}
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <label className="custom-control custom-checkbox mt-4">
                    <input type="checkbox" className="custom-control-input" />
                    <span className="custom-control-label">
                      Agree the
                      <Link to={`${process.env.PUBLIC_URL}/pages/terms/`}>
                         terms and policy
                      </Link>
                    </span>
                  </label>
                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      //  to={`${process.env.PUBLIC_URL}/dashboard/`}
                      className="login100-form-btn btn-primary"
                    >
                      Register
                    </button>
                  </div>
                  <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Already have account?
                      <Link
                        to={`/`}
                        className="text-primary ms-1"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
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
