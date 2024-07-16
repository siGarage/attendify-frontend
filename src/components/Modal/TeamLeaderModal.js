import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Card from "@mui/material/Card";


export function TeamLeaderModal({ setShow, show, userData }) {
    return (
        <Modal show={show} >
            <Modal.Body className="text-center p-4">
                <Card>
                    <CardActions className="card-header ">
                        <h3 className="card-title ">Team Leader Detail</h3>
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
                        <h2>Team Name: {userData?.teamName}</h2>
                        <div>
                            <div><span className="h3 mb-0 mt-3">Team Leader Name: {userData?.teamLeader}</span></div>
                            <br />
                            <div><span className="h4">Team:
                                <ul>
                                    {userData?.team?.map((userMember) => {
                                        return <li><i class="fa fa-user" aria-hidden="true"></i> {userMember}</li>
                                    })}
                                </ul>
                            </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Modal.Body>
        </Modal>
    );
}