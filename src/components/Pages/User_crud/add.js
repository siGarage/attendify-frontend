import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import '../../../App.css'; import {
    Col,
    Row,
    Card,
    Breadcrumb,
    Button,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DropImg } from "../Property/StepForm/component/DropImg";
import { fetchUserByRole, register, userUpdate } from "../../../redux/Action/AuthAction";




export default function EditorAdd() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { users, college, tab_status } = useSelector(state => ({
        users: state?.userAuth?.users,
        college: state?.propertyType?.college.filter(item => item?._id == params.id),
        tab_status: state?.propertyType?.tab_status,
    }));

    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "contact_no": "",
            "tab_status":"",
            "image": "",
            "role": 2,
        },
        onSubmit: values => {
            if (typeof values.image == 'object') {
                let formData = new FormData();
                for (let value in values) {
                    formData.append(value, values[value]);
                }
                dispatch(register(formData));
                navigate("/editor");
            } else {
                dispatch(register(values));
                navigate("/editor");
            }
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Row className=" row-sm">
                    <Col lg={12} xl={12} md={12} sm={12}>
                        <Card>
                            <Card.Header>
                                < Card.Title as="h3">Add Editor</Card.Title>
                            </Card.Header>
                            <Col sm={12} lg={12} md={12} xl={12}>
                                <Card >
                                    <Row>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                        placeholder='email'
                                                        className="form-control required"
                                                    />
                                                    {formik.errors.email && formik.touched.email ? (
                                                        <div style={{ color: "red" }}>{formik.errors.email}</div>
                                                    ) : null}
                                                    <label className="form-label">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}
                                                        placeholder='name'
                                                        className="form-control"
                                                    />
                                                    {formik.errors.name && formik.touched.name ? (
                                                        <div style={{ color: "red" }}>{formik.errors.name}</div>
                                                    ) : null}
                                                    <label className='fw-bold mt-5 '>Contact No</label>
                                                    <input
                                                        type="number"
                                                        name="contact_no"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.contact_no}
                                                        placeholder='contact_no'
                                                        className="form-control required"
                                                    />
                                                    {formik.errors.contact_no && formik.touched.contact_no ? (
                                                        <div style={{ color: "red" }}>{formik.errors.contact_no}</div>
                                                    ) : null}
                                                    <label className='fw-bold mt-5 '>Profile Photo</label>
                                                    <div className="control-group form-group mb-0 drop">
                                                        <label className="form-label">Team Leader Image</label>
                                                        <DropImg
                                                            type="file" className="dropify" imgtype="image"
                                                            formik={formik}
                                                        />
                                                    </div>
                                                    <Button type="submit" variant="primary" className="me-1 mt-5" >Submit</Button>
                                                </div>
                                            </div>
                                        </section>
                                    </Row>
                                </Card>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </form>
        </div>
    );
}