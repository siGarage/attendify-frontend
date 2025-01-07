import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  fetchLoginUserById,
  userProfileUpdate,
} from "../../../redux/Action/AuthAction";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state?.userAuth?.loginUser,
  }));

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLoginUserById(sessionStorage.getItem("userId")));
  }, []);

  const profileData = users?.user;
  
  const formik = useFormik({
    initialValues: {
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
    },
    onSubmit: (values) => {
      values = { ...formik.values, id };
      dispatch(userProfileUpdate(values));
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
                  User Name
                </label>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Please enter User name"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12">
                  <label className="fw-bold mt-5 ">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    placeholder="phone"
                    className="form-control required"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div style={{ color: "red" }}>{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-12">
                  <label className="fw-bold mt-5 ">Email</label>
                  <input
                    type="string"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="phone"
                    className="form-control required"
                    disabled
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-end">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={() => formik.handleSubmit()}
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
