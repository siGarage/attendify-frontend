import React from "react";
import { useState } from "react";
import { Col, Form, Row, } from "react-bootstrap";
import { DropImg } from "./DropImg";

const Other = ({ formik }) => {
  const [broucherName, setBroucherName] = useState();
  const [podEng, setPodEngName] = useState();
  const [podHin, setPodHinName] = useState();

  const handleChangePdf = (e, type) => {
    if (type == "podcast_eng") {
      formik.setFieldValue("podcast_eng", e.target.files[0])
      setPodEngName(e.target.files[0]?.name)
    } else if (type == "podcast_hindi") {
      formik.setFieldValue("podcast_hindi", e.target.files[0])
      setPodHinName(e.target.files[0]?.name)
    } else {
      formik.setFieldValue("broucher", e.target.files[0])
      setBroucherName(e.target.files[0]?.name)
    }

  }

  return (
    <>
      <section>


        <div className="control-group form-group mb-0">
          <Row className="row row-sm">
            <Col className="col-md-5 mb-4 mb-lg-0 drop" >
              <label className="form-label">Logo</label>
              {/* <div style={{ width: "180px", height: "165px", border: "1px solid black", marginBottom: "5px" }}></div> */}
              <DropImg type="file" className="dropify" imgtype="logo" formik={formik} />

            </Col>
            <Col className="col-md-5 mb-4 mb-lg-0 drop">
              <label className="form-label">Featured Image</label>

              <DropImg type="file" className="dropify" imgtype="featured" formik={formik} />
            </Col>
          </Row>
        </div>
        <div className="control-group form-group mb-0">
          <Row className="row row-sm">
            <Col className="col-md-6">
              <label className="form-label">Broucher</label>
              <div className="input-group mb-5 file-browser">
                <input
                  type="text"
                  className="form-control browse-file"
                  placeholder={broucherName == undefined ? "Choose" : broucherName}
                  readOnly
                //onClick={() => sweetalerts.Infoalertbutton()}
                />
                <Form.Label className="input-group-text btn btn-primary mt-0">
                  Browse
                  <input
                    type="file"
                    className="file-browserinput"
                    style={{ display: "none" }}
                    accept="application/pdf"
                    onChange={(e) => handleChangePdf(e)}
                  />
                </Form.Label>
              </div>
            </Col>
            <Col className="col-md-6">
              <label className="form-label">Info Video Link</label>
              <input
                type="url"
                className="form-control required"
                placeholder="Info Video Link"
                name="info_video_link"
                onChange={formik.handleChange}
                value={formik.values.info_video_link}
              />
              {formik.errors.info_video_link && formik.touched.info_video_link ? (
                <div style={{ color: "red" }}>{formik.errors.info_video_link}</div>
              ) : null}
            </Col>
          </Row>
        </div>
        <div className="form-group">
          <Row className="row row-sm">
            <Col className="col-md-3">
              <label className="form-label">Podcast Eng. Lang.</label>
              <div className="input-group mb-5 file-browser">
                <input
                  type="text"
                  className="form-control browse-file"
                  placeholder={podEng == undefined ? "Choose" : podEng}
                  readOnly
                //onClick={() => sweetalerts.Infoalertbutton()}
                />
                <Form.Label className="input-group-text btn btn-primary mt-0">
                  Browse
                  <input
                    type="file"
                    className="file-browserinput"
                    style={{ display: "none" }}
                    onChange={(e) => handleChangePdf(e, "podcast_eng")}
                    accept="application/pdf"
                  />
                </Form.Label>
              </div>
            </Col>
            <Col className="col-md-3">
              <label className="form-label">Podcast Hindi Lang.</label>
              <div className="input-group mb-5 file-browser">
                <input
                  type="text"
                  className="form-control browse-file"
                  placeholder={podHin == undefined ? "Choose" : podHin}
                  readOnly

                //onClick={() => sweetalerts.Infoalertbutton()}
                />
                <Form.Label className="input-group-text btn btn-primary mt-0">
                  Browse
                  <input
                    type="file"
                    className="file-browserinput"
                    style={{ display: "none" }}
                    onChange={(e) => handleChangePdf(e, "podcast_hindi")}
                    accept="application/pdf"
                  />
                </Form.Label>
              </div>
            </Col>
            <Col className="col-md-6">
              <label className="form-label">Application Link</label>
              <input
                type="url"
                className="form-control required"
                placeholder="Info Video Link"
                name="application_link"
                onChange={formik.handleChange}
                value={formik.values.application_link}
              />
              {formik.errors.application_link && formik.touched.application_link ? (
                <div style={{ color: "red" }}>{formik.errors.application_link}</div>
              ) : null}
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default Other;