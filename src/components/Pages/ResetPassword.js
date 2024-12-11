import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPass } from "../../redux/Action/AuthAction";
import {
  changePassDone
} from "../../redux/Action/AuthAction";

const RestPassword = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state?.userAuth?.loginUser,
  }));

  const { id } = useParams();

  useEffect(() => {
    // dispatch(fetchLoginUserById(sessionStorage.getItem("userId")));
  }, []);
  const SignupSchema = Yup.object().shape({
    r_password: Yup.string().required("*Required"),
    n_password: Yup.string().required("*Required"),
    c_password: Yup.string()
      .required("*Required")
      .oneOf([Yup.ref("n_password")], "*Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      r_password: "",
      n_password: "",
      c_password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      values = { ...formik.values, userId: sessionStorage.getItem("userId") };
      dispatch(changePassDone(values));
    },
  });

  return (
    <div className="container bg-white p-3 mt-5">
      <div className="row ">
        <div className="col">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/profile`}
                className="d-flex flex-row align-items-center back"
              >
                <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                <h6>Back to Profile</h6>
              </Link>
            </div>
            <form action="post" onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <label htmlFor="name" className="form-label">
                  Recent Password
                </label>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="r_password"
                    placeholder="Please enter your recent password"
                    value={formik?.values?.r_password}
                    onChange={formik?.handleChange}
                  />
                  {formik.errors.r_password && formik.touched.r_password ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.r_password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12">
                  <label className="fw-bold mt-5 ">New Password</label>
                  <input
                    type="text"
                    name="n_password"
                    onChange={formik.handleChange}
                    value={formik.values.n_password}
                    placeholder="Please enter your new password"
                    className="form-control required"
                  />
                  {formik.errors.n_password && formik.touched.n_password ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.n_password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12">
                  <label className="fw-bold mt-5 ">Confirm Password</label>
                  <input
                    type="text"
                    name="c_password"
                    onChange={formik.handleChange}
                    value={formik.values.c_password}
                    placeholder="Please enter your confirm password"
                    className="form-control required"
                  />
                  {formik.errors.c_password && formik.touched.c_password ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.c_password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-end">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={() => formik.handleSubmit()}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestPassword;
