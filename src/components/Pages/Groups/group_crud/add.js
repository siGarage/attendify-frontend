import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUsers } from "../../../../redux/Action/AuthAction";
import { createGroup} from "../../../../redux/Action/GroupAction";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactSwitch from "react-switch";
export default function SemesterAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fAttedenceViewPermission, setFacultyAttedenceViewPermission] =
    useState(false);
  const [fAttendeceUpdatePermission, setFacultyAttendenceUpdatePermision] =
    useState(false);
  const [sAttendenceViewPermision, setStudentAttendenceViewPermision] =
    useState(false);
  const [sAttendenceUpdatePermission, setStudentAttendenceUpdatePermision] =
    useState(false);
  const editor = useRef(null);
  const { Users } = useSelector((state) => ({
    Users: state?.userAuth?.getAllUsers,
  }));
  const [content, setContent] = useState("");
  const [confirmMembers, setConfirmMembers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
    },
    onSubmit: (values) => {
      values = {
        ...values,
        description: content,
        members: confirmMembers,
        facultyAttedenceViewPermission: fAttedenceViewPermission,
        studentAttendenceViewPermision: sAttendenceViewPermision,
        facultyAttendeceUpdatePermission: fAttendeceUpdatePermission,
        studentAttendenceUpdatePermission: sAttendenceUpdatePermission,
      };
        dispatch(createGroup(values));
      setTimeout(() => {
        navigate("/group-list");
      }, [2000]);
    },
  });
  const handleSetFacultyAttedenceViewPermission = (val) => {
    console.log(val);
    setFacultyAttedenceViewPermission(val);
  };
  const handleSetStudentAttedenceViewPermission = (val) => {
    setStudentAttendenceViewPermision(val);
  };
  const handleSetFacultyAttendeceUpdatePermission = (val) => {
    setFacultyAttendenceUpdatePermision(val);
  };
  const handleSetStudentAttendeceUpdatePermission = (val) => {
    setStudentAttendenceUpdatePermision(val);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Course</Card.Title>
              </Card.Header>
              <Col sm={12} lg={12} md={12} xl={12}>
                <Card>
                  <Row>
                    <section>
                      <div className="row">
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Name"
                            className="form-control required"
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Status</label>
                          <Form.Select
                            name="status"
                            onChange={formik.handleChange}
                          >
                            <option>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inative">InActive</option>
                          </Form.Select>
                          {formik.errors.status && formik.touched.status ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.status}
                            </div>
                          ) : null}
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>User</Form.Label>
                            <FormControl sx={{ m: 1, width: 1150 }}>
                              <InputLabel>Multiple Select</InputLabel>
                              <Select
                                multiple
                                value={confirmMembers}
                                onChange={(e) =>
                                  setConfirmMembers(e.target.value)
                                }
                                input={
                                  <OutlinedInput label="Multiple Select" />
                                }
                                renderValue={(selected) => (
                                  <Stack
                                    gap={1}
                                    direction="row"
                                    flexWrap="wrap"
                                  >
                                    {selected.map((value) => (
                                      <Chip
                                        key={value}
                                        label={value}
                                        onDelete={() =>
                                          setConfirmMembers(
                                            confirmMembers.filter(
                                              (item) => item !== value
                                            )
                                          )
                                        }
                                        deleteIcon={
                                          <CancelIcon
                                            onMouseDown={(event) =>
                                              event.stopPropagation()
                                            }
                                          />
                                        }
                                      />
                                    ))}
                                  </Stack>
                                )}
                              >
                                {Users.length > 0
                                  ? Users?.map((subject) => {
                                      return (
                                        <MenuItem
                                          key={subject._id}
                                          value={subject.email}
                                          sx={{
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          {subject.email}
                                          {confirmMembers.includes(
                                            subject.email
                                          ) ? (
                                            <CheckIcon color="info" />
                                          ) : null}
                                        </MenuItem>
                                      );
                                    })
                                  : ""}
                              </Select>
                            </FormControl>
                          </Form.Group>
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">
                            Group Description
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                          />
                        </Col>
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">
                            Group Permission
                          </label>
                          <table className="w-100 mt-3">
                            <tr>
                              <th>Name</th>
                              <th>View</th>
                              <th>Update</th>
                            </tr>
                            <tr>
                              <td>Faculty Attendence</td>
                              <td>
                                <ReactSwitch
                                  checked={fAttedenceViewPermission}
                                  onChange={
                                    handleSetFacultyAttedenceViewPermission
                                  }
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={fAttendeceUpdatePermission}
                                  onChange={
                                    handleSetFacultyAttendeceUpdatePermission
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Student Attendence</td>
                              <td>
                                <ReactSwitch
                                  checked={sAttendenceViewPermision}
                                  onChange={
                                    handleSetStudentAttedenceViewPermission
                                  }
                                />
                              </td>
                              <td>
                                <ReactSwitch
                                  checked={sAttendenceUpdatePermission}
                                  onChange={
                                    handleSetStudentAttendeceUpdatePermission
                                  }
                                />
                              </td>
                            </tr>
                          </table>
                        </Col>
                      </div>
                      <Button
                        type="submit"
                        variant="primary"
                        className="me-1 mt-5"
                      >
                        Submit
                      </Button>
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
