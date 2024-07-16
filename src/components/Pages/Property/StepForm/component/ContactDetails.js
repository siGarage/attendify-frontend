import React from "react";
import { Col, Form, Row, } from "react-bootstrap";

const ContactDetails = ({ formik }) => {
  return (
    <> <section>
      <div className="row">
        <div className="col-md-12">
          <div >
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control required"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div style={{color:"red"}}>{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        {/* <div className="col-md-6">
            <div >
              <label className="form-label">Verify</label>
              <input
                type="email"
                className="form-control required"
                placeholder="Email Address"
              />
            </div>
          </div> */}

      </div>
      <div className="control-group form-group">
        <label className="form-label">Phone Number</label>
        <input
          type="text"
          className="form-control required"
          placeholder="Contact Number"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div style={{color:"red"}}>{formik.errors.phone}</div>
        ) : null}
      </div>
      <div className="control-group form-group mb-0">
        <label className="form-label">Website</label>
        <input
          type="url"
          className="form-control required"
          placeholder="Website"
          name="website"
          onChange={formik.handleChange}
          value={formik.values.website}
        />
        {formik.errors.website && formik.touched.website ? (
          <div style={{color:"red"}}>{formik.errors.website}</div>
        ) : null}
      </div>
    </section></>
  )
}

export default ContactDetails