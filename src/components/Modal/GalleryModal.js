import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import { FormSelect } from "../Forms/FormSelect";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { DropImg } from "../Pages/Property/StepForm/component/DropImg";
import { createGallery, getGallery } from "../../redux/Action/PropertyAction";
import { useParams } from "react-router-dom";

const statusvalSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

export function GalleryModal({ open, scroll, handleClose, editGallery, type }) {
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      "title": editGallery?.title || "",
      "property_id": editGallery?.property_id || "",
      "gallery_img": editGallery?.gallery_img || ""
    },
    validationSchema: statusvalSchema,
    onSubmit: values => {
      if (editGallery != undefined) {
        if (typeof values.gallery_img[0] != 'string') {
          let formData = new FormData();
          formData.append("property_id", values.property_id);
          formData.append("id", editGallery._id);
          formData.append("title", values.title);
          formData.append("type", "edit");
          for (const image of values.gallery_img) {
            formData.append("gallery_img", image);
          }
          dispatch(createGallery(formData))
        } else {
          dispatch(createGallery({
            property_id: values.property_id,
            id: editGallery._id,
            title: values.title,
            type: "edit",
            gallery_img: values.gallery_img
          }));
        }
      } else {
        let formData = new FormData();
        formData.append("property_id", type == "coaching" ? params.coachingId : params.schoolId);
        formData.append("title", values.title);
        for (const image of values.gallery_img) {
          formData.append("gallery_img", image);
        }
        dispatch(createGallery(formData));
        dispatch(getGallery());
      }
      dispatch(getGallery());
      formik.resetForm();
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
          <DialogTitle id="scroll-dialog-title">{editGallery != undefined ? "Edit Gallery" : "Add Gallery"}</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              ref={descriptionElementRef}
              tabIndex={-1}
            >

              <div className="control-group form-group ">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  name="title"
                />
                {formik.errors.title && formik.touched.title ? (
                  <div style={{ color: "red" }}>{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="control-group form-group drop">
                <label className="form-label">Gallery Img</label>

                <DropImg
                  type="file" className="dropify" imgtype="gallery"
                  formik={formik}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="secondary" className="me-1" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="me-1" >Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  );
}