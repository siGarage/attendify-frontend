import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
//import { FormSelect } from "../Forms/FormSelect";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchUserByRole,
  register,
  userUpdate,
} from "../../redux/Action/AuthAction";


const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string()
    .email("Invalid email")
    .required("Email field is required"),
  contact_no: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export function CategoryModal({
  open,
  role,
  scroll,
  handleClose,
  editUser,
  profile,
}) {
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

  const [image, setImage] = useState('');
  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleApi(){
    const formData = new FormData();
    formData.append('image', image);
    axios.post('.../assets/images',formData).then((res) => {
        console.log(res);
    })
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editUser?.name || "",
      parent: editUser?.parent || "",
      contact_no: editUser?.contact_no || "",
      "alt_contact": editUser?.alt_contact || "",
        "cafename": editUser?.cafename || "",
        "cafecity": editUser?.cafecity || "",
        "role": editUser?.role || role,
      file: editUser?.file || "",
      logo: editUser?.logo || "",
      description: editUser?.description || "",
       "password": editUser?.password || "",
       "confirm_password": editUser?.confirm_password || "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      if (editUser != undefined) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(userUpdate(editUser?._id, formData));
        dispatch(fetchUserByRole(editUser?.role));
      } else {
        dispatch(register(values));
      }
      formik.resetForm();
      handleClose();
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
          <DialogTitle id="scroll-dialog-title">
            {editUser != undefined ? "Edit User" : "Add Category"}
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
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
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="control-group form-group">
                <label className="form-label">Parent</label>
                <select id="parent" name="parent">
                  <option value="managment">Managment</option>
                  <option value="technical">Technical</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="medical">Medical</option>
                  <option value="others">Others</option>
                </select>
               </div>

              <div className="control-group form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control required"
                  placeholder="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                />
                {formik.errors.description && formik.touched.description ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              <div>
              <label className="form-label">Image</label>
                <input type="file" name="file" onChange={handleImage}/>
                {/* <button onClick={handleApi}>Submit</button> */}
              </div>

              <div>
              <label className="form-label">Logo</label>
                <input type="file" name="file" onChange={handleImage}/>
                {/* <button type="button" onClick={handleApi}>Submit</button> */}
              </div>


               {/* <div className="control-group form-group">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  className="form-control required"
                  placeholder="upload logo"
                  onChange={formik.handleChange}
                  value={formik.values.file}
                  name="logo"
                />
                {formik.errors.description && formik.touched.description ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.description}
                  </div>
                ) : null}
              </div> */}

             
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="secondary" className="me-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="me-1">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
