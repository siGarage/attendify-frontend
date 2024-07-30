import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Breadcrumb, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DropImg } from "../../Property/StepForm/component/DropImg";
import { ImagePreviewCard } from "../../../Card/ImagePreviewCard";
import {
  fetchCourse,
  courseUpdate,
} from "../../../../redux/Action/CourseAction";
// import { fetchCourse, examUpdate } from "../../../../redux/Action/ExamAction";

export default function CourseUpdate() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const { Courses } = useSelector((state) => ({
    Courses: state?.courses?.courses?.filter((item) => item?._id == params?.id),
  }));
  //   console.log(, "Courses");
  const [content, setContent] = useState(Courses[0]?.description);
  useEffect(() => {
    dispatch(fetchCourse());
  }, []);
  const formik = useFormik({
    initialValues: {
      name: Courses[0].name || "",
      status: "active",
    },
    onSubmit: (values) => {
      let _id = params?.id;
      values = {
        id: _id,
        description: content,
        ...values,
      };
      dispatch(courseUpdate(values));
      navigate("/course-list");
    },
  });
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
                        <Col sm={12} lg={4} md={4} xl={4}>
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
                        <Col
                          sm={12}
                          lg={4}
                          md={4}
                          xl={4}
                          style={{ display: "none" }}
                        >
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
                        {/* <Col sm={12} lg={12} md={12} xl={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <FormControl sx={{ m: 1, width: 1150 }}>
                              <InputLabel>Multiple Select</InputLabel>
                              <Select
                                multiple
                                value={confirmSubject}
                                onChange={(e) =>
                                  setconfirmSubject(e.target.value)
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
                                          setconfirmSubject(
                                            confirmSubject.filter(
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
                                {subject.map((name) => {
                                  return (
                                    <MenuItem
                                      key={name}
                                      value={name}
                                      sx={{ justifyContent: "space-between" }}
                                    >
                                      {name}
                                      {confirmSubject.includes(name) ? (
                                        <CheckIcon color="info" />
                                      ) : null}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Form.Group>
                        </Col> */}
                        <Col sm={12} lg={12} md={12} xl={12}>
                          <label className="fw-bold mt-5 ">
                            Course Description
                          </label>
                          <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                          />
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
