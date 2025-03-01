import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import '../../../../App.css';
import {
    Col,
    Row,
    Card,
    Breadcrumb,
    Button,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByRole, userDelete, userListUpdate, createTeamLeader, getTeamLeader,updateTeamLead } from "../../../../redux/Action/AuthAction";
import {
    Stack,
    OutlinedInput,
    InputLabel,
    MenuItem,
    Chip,
    Select,
    FormControl,
    Autocomplete,
    TextField
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddTeamLeader() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const { users, college, tab_status, teamLeaders } = useSelector(state => ({
        users: state?.userAuth?.users?.users,
        teamLeaders: state?.userAuth?.teamLeader.filter(item => item._id == params.id),
    }));
    const [teamLeader, setTeamleader] = React.useState(teamLeaders[0]?.teamLeader || "");
    const [teamName, setTeamName] = React.useState(teamLeaders[0]?.teamName || "");
    const [team, setTeam] = React.useState(teamLeaders[0]?.team || []);
    const [teamList, setTeamList] = React.useState([]);
    useEffect(() => {
        dispatch(fetchUserByRole(2));
        dispatch(getTeamLeader());
        if (users?.length > 0) {
            let filterList = [];
            users?.map((usr) => {
                if (usr.isTeamLeader == undefined && usr.underTeam == undefined) {
                    filterList.push(usr.name);
                }
            });
            if (filterList.length > 0) {
                setTeamList([...filterList,teamLeaders[0]?.teamLeader, ...teamLeaders[0]?.team]);
            }
        }
    }, []);
    const formik = useFormik({
        onSubmit: values => {
            values = {
                "teamLeader": teamLeader,
                "type": "Caller",
                "team": team,
                "teamName": teamName,
                "id": params.id
            }
            dispatch(updateTeamLead(values));
            dispatch(getTeamLeader());
            // navigate("/callerTeamList");
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Row className=" row-sm">
                    <Col lg={12} xl={12} md={12} sm={12}>
                        <Card>
                            <Card.Header>
                                < Card.Title as="h3">Add Editor Team Leader</Card.Title>
                            </Card.Header>
                            <Col sm={12} lg={12} md={12} xl={12}>
                                <Card >
                                    <Row>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Team Name</label>
                                                            <input
                                                                type="text"
                                                                name="teamName"
                                                                onChange={(e) => { setTeamName(e.target.value) }}
                                                                value={teamName}
                                                                placeholder='Team Name'
                                                                className="form-control required"
                                                            />
                                                            {formik.errors.teamName && formik.touched.teamName ? (
                                                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Team Leader</label>
                                                            <select
                                                                type="text"
                                                                name="TeamLeader"
                                                                onChange={(e) => { setTeamleader(e.target.value) }}
                                                                value={teamLeader}
                                                                className="form-control required"
                                                            >
                                                                <option value="none">Please select your team leader. </option>
                                                                {teamList?.map((usr) => {
                                                                    return <option value={usr}>{usr}</option>
                                                                })}
                                                            </select>
                                                            {formik.errors.email && formik.touched.email ? (
                                                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <label className="form-label">Team</label>
                                                    <FormControl sx={{ m: 1, width: 1150 }}>
                                                        <InputLabel>Multiple Select</InputLabel>
                                                        <Select
                                                            multiple
                                                            value={team}
                                                            onChange={(e) => setTeam(e.target.value)}
                                                            input={<OutlinedInput label="Multiple Select" />}
                                                            renderValue={(selected) => (
                                                                <Stack gap={1} direction="row" flexWrap="wrap">
                                                                    {selected.map((value) => (
                                                                        <Chip
                                                                            key={value}
                                                                            label={value}
                                                                            onDelete={() =>
                                                                                setTeam(
                                                                                    team.filter((item) => item !== value)
                                                                                )
                                                                            }
                                                                            deleteIcon={
                                                                                <CancelIcon
                                                                                    onMouseDown={(event) => event.stopPropagation()}
                                                                                />
                                                                            }
                                                                        />
                                                                    ))}
                                                                </Stack>
                                                            )}
                                                        >
                                                            {teamList.map((name) => (
                                                                <MenuItem
                                                                    key={name}
                                                                    value={name}
                                                                    sx={{ justifyContent: "space-between" }}
                                                                >
                                                                    {name}
                                                                    {team.includes(name) ? <CheckIcon color="info" /> : null}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
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