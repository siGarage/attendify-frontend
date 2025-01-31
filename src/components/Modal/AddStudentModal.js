import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchCourse } from "../../redux/Action/CourseAction";
import { fetchDepartment } from "../../redux/Action/DepartmentAction";
import { fetchSubject } from "../../redux/Action/SubjectAction";
import { fetchSemester } from "../../redux/Action/SemesterAction";
import { createStudentAttendenceByCsv } from "../../redux/Action/StudentAttendenceAction";
import * as Yup from "yup";

export function AddStudentAttendenceModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Courses, Subjects, Departments, Semesters } = useSelector(
    (state) => ({
      Courses: state?.courses?.courses,
      Subjects: state?.subjects?.subjects,
      Departments: state?.departments?.departments,
      Semesters: state?.semesters?.semesters,
    })
  );
  useEffect(() => {
    if (Courses?.length == 0) {
      dispatch(fetchCourse());
    }
    if (Semesters?.length == 0) {
      dispatch(fetchSemester());
    }
    if (Subjects?.length == 0) {
      dispatch(fetchSubject());
    }
    if (Departments?.length == 0) {
      dispatch(fetchDepartment());
    }
  }, []);
  const SignupSchema = Yup.object().shape({
    course_id: Yup.string().required("*Required"),
    semester_id: Yup.string().required("*Required"),
    subject_id: Yup.string().required("*Required"),
    type: Yup.string().required("*Required"),
  });
  const formik = useFormik({
    initialValues: {
      course_id: "",
      subject_id: "",
      semester_id: "",
      teacher_id:"",
      type: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      dispatch(createStudentAttendenceByCsv(formData));
      resetForm();
      handleClose();
    },
  });

  return (
    <>
      <form>
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Student Attendence</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Row>
                <Col>
                  <label className="form-label">Course</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.course_id}
                    className="form-control required"
                    name="course_id"
                    id="course_id"
                  >
                    <option value="">Please Select Course</option>
                    {Courses?.length > 0
                      ? Courses?.map((Course) => {
                          return (
                            <option value={Course?._id}>{Course?.name}</option>
                          );
                        })
                      : ""}
                  </select>
                  {formik.errors.course_id && formik.touched.course_id ? (
                    <div className="red_color">{formik.errors.course_id}</div>
                  ) : null}
                </Col>
                <Col>
                  <label className="form-label">Subject</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.subject_id}
                    className="form-control required"
                    name="subject_id"
                    id="subject_id"
                  >
                    <option value="">Please Select Subject</option>
                    {Subjects?.length > 0
                      ? Subjects?.map((Subject) => {
                          return (
                            <option value={Subject?._id}>
                              {Subject?.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                  {formik.errors.subject_id && formik.touched.subject_id ? (
                    <div className="red_color">{formik.errors.subject_id}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-label">Phase</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.semester_id}
                    className="form-control required"
                    name="semester_id"
                    id="semester_id"
                  >
                    <option value="">Please Select Phase</option>
                    {Semesters?.length > 0
                      ? Semesters?.map((Semester) => {
                          return (
                            <option value={Semester?._id}>
                              {Semester?.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                  {formik.errors.semester_id && formik.touched.semester_id ? (
                    <div className="red_color">{formik.errors.semester_id}</div>
                  ) : null}
                </Col>
                <Col>
                  <label className="form-label">Type</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    className="form-control required"
                    name="type"
                    id="type"
                  >
                    <option value="">Please Select Type</option>
                    <option value="Theory">Theory</option>
                    <option value="Clinical">Clinical</option>
                    <option value="Practical">Practical</option>
                    <option value="Ece">Ece</option>
                    <option value="Aetcom">Aetcom</option>
                    <option value="Fap">Fap</option>
                  </select>
                  {formik.errors.type && formik.touched.type ? (
                    <div className="red_color">{formik.errors.type}</div>
                  ) : null}
                </Col>
              </Row>
              <Row>
              <Col>
                  <label className="form-label">Teacher</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.teacher_id}
                    className="form-control required"
                    name="subject_id"
                    id="subject_id"
                  >
                    <option value="">Please Select Subject</option>
                    {Subjects?.length > 0
                      ? Subjects?.map((Subject) => {
                          return (
                            <option value={Subject?._id}>
                              {Subject?.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                  {formik.errors.subject_id && formik.touched.subject_id ? (
                    <div className="red_color">{formik.errors.subject_id}</div>
                  ) : null}
                </Col>
                <Col lg={6} md={6} xs={12} sm={12}>
                  <label className="form-label">CSV Upload</label>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) =>
                      formik.setFieldValue("csv", event.target.files[0])
                    }
                    accept=".csv"
                    style={{ display: "block", margin: "10px auto" }}
                  />
                </Col>
              </Row>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => formik.handleSubmit()}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}
