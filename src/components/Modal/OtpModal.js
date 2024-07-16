import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const statusvalSchema = Yup.object().shape({
    propertyClaimOtp: Yup.string().required('Otp is required'),
});

export function OtpModal({ open, scroll, handleClose, propertyId, userId }) {
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
            "propertyClaimOtp": ""
        },
        validationSchema: statusvalSchema,
        onSubmit: async values => {
            values = { property_id: propertyId, user_id: sessionStorage.getItem("userId"), ...values };
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
                body: JSON.stringify(values)
            };
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/checkOtpForClaim`, requestOptions);
            const data = await response.json();
            console.log(data.status_code);
            if (data.status_code == 404) {
                toast.error(data.message);
            }
            if (data.status_code == 200) {
                toast.success(data.message);
            }
            formik.resetForm();
            handleClose();
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
                    <DialogTitle id="scroll-dialog-title">For OTP please check your property email.</DialogTitle>
                    <DialogContent dividers={scroll === "paper"}>
                        <DialogContentText
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <div className="control-group form-group ">
                                <label className="form-label">OTP</label>
                                <input
                                    type="text"
                                    className="form-control required"
                                    placeholder="Please enter OTP here!"
                                    onChange={formik.handleChange}
                                    value={formik.values.propertyClaimOtp}
                                    name="propertyClaimOtp"
                                />
                                {formik.errors.propertyClaimOtp && formik.touched.propertyClaimOtp ? (
                                    <div style={{ color: "red" }}>{formik.errors.propertyClaimOtp}</div>
                                ) : null}
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