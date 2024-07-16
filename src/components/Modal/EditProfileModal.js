import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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
import { fetchUserById, fetchUserByRole, register, userUpdate } from "../../redux/Action/AuthAction";
import { DropImg } from "../Pages/Property/StepForm/component/DropImg";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


// const SignupSchema = Yup.object().shape({
//   name:Yup.string().required("Please enter your name."),
//   email: Yup.string().email('Invalid email').required('Email field is required'),
//   contact_no:Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
// });

const editProfileSchema = Yup.object().shape({
  name:Yup.string().min(2).required(),
  description:Yup.string().required()
})

export function EditProfileModal({ open, role, scroll, handleClose, editUser, profile }) {
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
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
      "name": editUser?.name || "",
      "description":editUser?.description || "",
      'image':editUser?.image || ''
    },
     validationSchema: editProfileSchema,
    onSubmit: values => {

      // alert(JSON.stringify(values, null, 2));
      if (editUser != undefined) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(userUpdate(editUser?._id, formData));
        dispatch(fetchUserById(editUser?._id))
      } else {
        // dispatch(register(values));
      }
      formik.resetForm()
      handleClose()
      //alert(JSON.stringify(values, null, 2));
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
          <DialogTitle id="scroll-dialog-title">{editUser != undefined ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              ref={descriptionElementRef}
              tabIndex={-1}
            >

              <div className="control-group form-group ">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                />
                 {formik.errors.name && formik.touched.name ? (
                    <div style={{color:"red"}}>{formik.errors.name}</div>
                  ) : null}
              </div>
              <div className="control-group form-group">
                <label className="form-label">Biography</label>
                  <textarea
                    name="description"
                    className="form-control required"
                    rows="3" 
                    placeholder="Biography........"
                    type="text"
                    onChange={formik.handleChange}
                      value={formik.values.description}
                  />
             
                </div>
              {/* <input type="file" name="file" id="file" accept="image/*"/> */}
                <DropImg
                  type="file" className="dropify" imgtype="profile" 
                  formik={formik}
                />
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