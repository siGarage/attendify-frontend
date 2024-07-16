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
import { fetchUserByRole, register, userUpdate } from "../../redux/Action/AuthAction";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const SignupSchema = Yup.object().shape({
  name:Yup.string().required("Please enter your name."),
  email: Yup.string().email('Invalid email').required('Email field is required'),
  contact_no:Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

export function SimpleModal({ open, role, scroll, handleClose, editUser, profile }) {
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
      "email": editUser?.email || "",
      "contact_no": editUser?.contact_no || "",
      // "alt_contact": editUser?.alt_contact || "",
      "cafename": editUser?.cafename || "",
      "cafecity": editUser?.cafecity || "",
      "role": editUser?.role || role,
      "description":editUser?.description || "",
      // "password": editUser?.password || "",
      // "confirm_password": editUser?.confirm_password || "",
    },
     validationSchema: SignupSchema,
    onSubmit: values => {

      // alert(JSON.stringify(values, null, 2));
      if (editUser != undefined) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(userUpdate(editUser?._id, formData));
        dispatch(fetchUserByRole(editUser?.role))
      } else {
        dispatch(register(values));
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control required"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                />
                 {formik.errors.email && formik.touched.email ? (
              <div style={{color:"red"}}>{formik.errors.email}</div>
            ) : null}
              </div>
              <div className="control-group form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Contact Number"
                  onChange={formik.handleChange}
                  value={formik.values.contact_no}
                  name="contact_no"

                />
                 {formik.errors.contact_no && formik.touched.contact_no ? (
              <div style={{color:"red"}}>{formik.errors.contact_no}</div>
            ) : null}
              </div>
              {profile == "profile" &&
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
              }
              {/* <div className="control-group form-group">
                <label className="form-label">Alt Contact</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="Alt Contact"
                  onChange={formik.handleChange}
                  value={formik.values.alt_contact}
                  name="alt_contact"
                />
              </div> */}
              {role == 4 &&
                <>
                  <div className="control-group form-group">
                    <label className="form-label">Cafe Name</label>
                    <input
                      type="text"
                      className="form-control required"
                      placeholder="Cafe Name"
                      onChange={formik.handleChange}
                      value={formik.values.cafename}
                      name="cafename"
                    />
                  </div>
                  <div className="control-group form-group">
                    <label className="form-label">Cafe City</label>
                    <input
                      type="text"
                      className="form-control required"
                      placeholder="Cafe City"
                      onChange={formik.handleChange}
                      value={formik.values.cafecity}
                      name="cafecity"
                    />
                  </div>

                </>
              }
              {/* <FormSelect /> */}
              {/* <div className="control-group form-group">
                <label className="form-label">Role</label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  className="form-control required"
                  name="role" id="role">
                  <option >Select</option>
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                  {["5"].includes(sessionStorage.getItem("role")) &&
                  <option value="2">Editor</option>
                  }
                  <option value="3">Caller</option>
                  <option value="4">Cyber Partner</option>
                  {["5"].includes(sessionStorage.getItem("role")) &&
                  <option value="5">Superadmin</option>
                  }
                </select>
              </div>
              {editUser != undefined ? '' :
                <>
                  <div className="control-group form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control required"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                    />
                  </div>
                  <div className="control-group form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control required"
                      placeholder="Confirm Password"
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                      name="confirm_password"
                    />
                  </div>
                </>
              } */}

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