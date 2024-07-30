import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import "../../../../App.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchSemester,
  semesterUpdate,
} from "../../../../redux/Action/SemesterAction";
import { fetchCourse } from "../../../../redux/Action/CourseAction";
import { Form } from "react-bootstrap";
import JoditEditor from "jodit-react";
export default function SemesterAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const editor = useRef(null);
  const { Courses, Semesters } = useSelector((state) => ({
    Courses: state?.courses?.courses,
    Semesters: state?.semesters?.semesters?.filter(
      (item) => item?._id == params?.id
    ),
  }));
  const [content, setContent] = useState(Semesters[0].description || "");

  useEffect(() => {
    dispatch(fetchCourse());
    dispatch(fetchSemester());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: Semesters[0].name || "",
      course_id: Semesters[0].course_id || "",
      status: "active",
    },
    onSubmit: (values) => {
      let _id = params?.id;
      values = {
        id: _id,
        ...values,
        description: content,
      };
      dispatch(semesterUpdate(values));
      navigate("/semester-list");
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row className=" row-sm">
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Add Phase</Card.Title>
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
                        <Col sm={12} lg={6} md={6} xl={6}>
                          <label className="form-label">Course</label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.course_id}
                            className="form-control required"
                            name="course_id"
                          >
                            <option>Please Select Course</option>
                            {Courses?.length > 0
                              ? Courses?.map((course) => {
                                  return (
                                    <option value={course?._id}>
                                      {course?.name}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          {formik.errors.course_id &&
                          formik.touched.course_id ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.course_id}
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
                                {Subjects.map((subject) => {
                                  return (
                                    <MenuItem
                                      key={subject._id}
                                      value={subject.name}
                                      sx={{ justifyContent: "space-between" }}
                                    >
                                      {subject.name}
                                      {confirmSubject.includes(subject.name) ? (
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
                            Phase Description
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
