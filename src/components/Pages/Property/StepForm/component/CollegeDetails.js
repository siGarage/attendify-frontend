import { React, useEffect } from "react";
import { Col, Form, Row, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import fromadvanced from '../../../../../'
import { getCollegeAffliateApprove } from "../../../../../redux/Action/PropertyTypeAction";
import { SearchSelect } from "./SelectCreatable";
const CollegeDetails = ({ formik }) => {
  const dispatch = useDispatch();
  const { affiliate_approve } = useSelector(state => ({
    affiliate_approve: state?.property?.affiliate_approve,
  }));

  useEffect(() => {
    dispatch(getCollegeAffliateApprove())
  }, [])

  console.log(affiliate_approve, "affiliate_approve")

  return (
    <div>
      <h3>College/University Details</h3>
      <section>

        <div className="control-group form-group">
          <label className="form-label">Type</label>
          <select
            onChange={formik.handleChange}
            value={formik.values.edu_type}
            className="form-control required"
            name="edu_type" id="role">
            <option >Select</option>
            <option value="College">College</option>
            <option value="University">University</option>

          </select>
        </div>
        <div className="control-group form-group">

          <label className="form-label">College Type</label>
          <select
            onChange={formik.handleChange}
            value={formik.values.college_type}
            className="form-control required"
            name="college_type" id="role">
            <option>Select</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="Semi-Government">Semi-Government</option>
          </select>
          {/* <Row className="row row-sm">
                <Col className="col-md-4">
                  <label className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="example-radios"
                      defaultValue="option1"
                      defaultChecked
                    />
                    <span className="custom-control-label">Private</span>
                  </label>
                </Col>
                <Col className="col-lg-4">
                  <label className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="example-radios"
                      defaultValue="option1"
                      defaultChecked
                    />
                    <span className="custom-control-label">Government</span>
                  </label>
                </Col>
                <Col className="col-lg-4">
                  <label className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="example-radios"
                      defaultValue="option1"
                      defaultChecked
                    />
                    <span className="custom-control-label">Semi-Government</span>
                  </label>
                </Col>
              </Row>
   */}


        </div>
        <div className="control-group form-group mb-0">
          <Row className="row row-sm">
            <Col className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div>{formik.errors.name}</div>
              ) : null}

            </Col>
            <Col className="col-md-6">
              <label className="form-label">Short Name</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Short Name"
                name="short_name"
                onChange={formik.handleChange}
                value={formik.values.short_name}
              />
              {formik.errors.short_name && formik.touched.short_name ? (
                <div>{formik.errors.short_name}</div>
              ) : null}

            </Col>
          </Row>
        </div>
        <div className="control-group form-group mb-0">
          <Row className="row row-sm">
            <Col className="col-md-6">
              <label className="form-label">Est. Year</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Short Name"
                name="est_year"
                onChange={formik.handleChange}
                value={formik.values.est_year}
              />
              {formik.errors.est_year && formik.touched.est_year ? (
                <div>{formik.errors.est_year}</div>
              ) : null}
            </Col>
            <Col className="col-md-6">
              <label className="form-label">Approve By</label>
              {/* <input
                type="text"
                className="form-control required"
                placeholder="Approve By"
              /> */}
              <SearchSelect name="approve_by" formik={formik} affiliate_approve={affiliate_approve} />
            </Col>
          </Row>
        </div>
        <div className="form-group">
          <label className="form-label">Affiliated By</label>
          {/* <input
            type="text"
            className="form-control"
            id="name1"
            placeholder="Affiliated By"
          /> */}
          <SearchSelect name="affilite_by" formik={formik} affiliate_approve={affiliate_approve}/>
        </div>
      </section>

    </div>
  )
}

export default CollegeDetails