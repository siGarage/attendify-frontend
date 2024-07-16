import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Card from "@mui/material/Card";


export function UserDetailModal({ setShow, show, userData }) {
    return (
        <Modal show={show} >
            <Modal.Body className="text-center p-4">
                <Card>
                    <CardActions className="card-header ">
                        <h3 className="card-title ">User Detail</h3>
                        <div className="rtlcards ">
                            <IconButton
                                size="small"
                                edge="start"
                                color="inherit"
                                onClick={() => setShow(false)}
                                aria-label="close"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </CardActions>
                    <CardContent className="card-body text-center">
                        <img
                            className="avatar avatar-xxl brround cover-image cover-image mt-3 mb-3"
                            src={`${process.env.REACT_APP_API_BASE_URL}/images/${userData?.image}`} alt=""
                        />
                        <div className="mb-3">
                            <span className="h4 mb-0 mt-3">{userData?.name}</span>
                            <br />
                            <span className="card-text">{userData?.email}</span>
                        </div>

                    </CardContent>
                </Card>
            </Modal.Body>
        </Modal>
    );
}