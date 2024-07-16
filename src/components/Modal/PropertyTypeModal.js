import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createPropertyType, getPropertyType,updatePropertyType } from "../../redux/Action/PropertyTypeAction";

const PropertyTypeSchema = Yup.object().shape({
    parent: Yup.string().required('Please select parent property.'),
    property_name: Yup.string().required('Property name is required.'),
    form_url: Yup.string().required('Property url is required.'),
});

export function PropertyTypeModal({ open, scroll, handleClose,editProperty }) {
  const descriptionElementRef = React.useRef(null);
  const { property } = useSelector(state => ({
    property: state?.property?.property,
  }));

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  useEffect(()=>{
    dispatch(getPropertyType())
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      "parent": editProperty?.parent || "",
      "property_name": editProperty?.property_name || "",
      "property_desc": editProperty?.property_desc || "",
      "form_url":  editProperty?.form_url || "",
      "property_img": editProperty?.property_img || "",
    },
     validationSchema: PropertyTypeSchema,
    onSubmit: values => {
      //alert(JSON.stringify(values, null, 2));
      if(editProperty != undefined) {
        dispatch(updatePropertyType(editProperty?._id,values));
        dispatch(getPropertyType());
        window.location.reload(false);
      }else{
        dispatch(createPropertyType(values));
      }
      formik.resetForm()
      handleClose()
    },
  });
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="scroll-dialog-title">{editProperty!= undefined?`Add Property Type`:`Update Property Type`}</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="control-group form-group ">
                <label className="form-label">Parent</label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.parent}
                  className="form-control required"
                  name="parent" id="role">
                  <option >Select</option>
                  <option value="0">Uncategorized</option>
                  {
                    property?.map((item,i)=>{
                        return (
                            <>
                            <option value={item?._id}>{item?.property_name}</option>
                            </>
                        )
                    })
                  }
                </select>
                {formik.errors.parent && formik.touched.parent ? (
                      <div style={{color:"red"}}>{formik.errors.parent}</div>
                    ) : null}
              </div>
              <div className="control-group form-group">
                <label className="form-label">Property Name</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Property Name"
                  onChange={formik.handleChange}
                  value={formik.values.property_name}
                  name="property_name"
                />
                  {formik.errors.property_name && formik.touched.property_name ? (
                      <div style={{color:"red"}}>{formik.errors.property_name}</div>
                    ) : null}
              </div>
              <div className="control-group form-group">
                <label className="form-label">Property Url</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Property Url"
                  onChange={formik.handleChange}
                  value={formik.values.form_url}
                  name="form_url"
                />
                  {formik.errors.form_url && formik.touched.form_url ? (
                      <div style={{color:"red"}}>{formik.errors.form_url}</div>
                    ) : null}
              </div>
              <div className="control-group form-group">
                <label className="form-label">Property Description</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Property Description"
                  onChange={formik.handleChange}
                  value={formik.values.property_desc}
                  name="property_desc"
                />
              </div>
              <div className="input-group mb-5 file-browser">
                <input
                  type="text"
                  className="form-control browse-file"
                  placeholder="Choose"
                  readOnly
                  // onClick={() => sweetalerts.Infoalertbutton()}
                />
                <Form.Label className="input-group-text btn btn-primary mt-0">
                  Browse
                  <input
                    type="file"
                    className="file-browserinput"
                    style={{ display: "none" }}
                    multiple
                  />
                </Form.Label>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="secondary" className="me-1" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="me-1" onClick={formik.handleSubmit} >Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  );
}