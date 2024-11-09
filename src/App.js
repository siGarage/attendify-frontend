import { Navigate, Route, Routes } from "react-router-dom";
import ChangePassword from "./components/Authentication/ForgotPassword/ChangePassword";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Authentication/ForgotPassword/ResetPassword";
import Login from "./components/Authentication/Login/Login";
import Profile from "./components/Pages/Profile";
import StudentProfile from "./components/Pages/StudentProfile";
import TeacherProfile from "./components/Pages/TeacherProfile";
import SelfAttendance from "./components/Pages/SelfAttendance";
import Register from "./components/Authentication/Register/Register";
import SuperAdmin from "./components/Authentication/SuperAdmin/SuperAdmin.js";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/Pages/profileEdit/EditProfile";
import Editors from "./components/Pages/User/Editors";
import UpdateEditor from "./components/Pages/User_crud/update";
import AddEditors from "./components/Pages/User_crud/add";
import Guest from "./components/Pages/User/Guest";
import RootApp from "./helper/RootApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agent from "./components/Pages/User/Agent";

//////////////////

import Course from "./components/Pages/Course/Course";
import CreateCourse from "./components/Pages/Course/course_crud/add";
import UpdateCourse from "./components/Pages/Course/course_crud/update";
import Subject from "./components/Pages/Subjects/Subject";
import CreateSubject from "./components/Pages/Subjects/subject_crud/add";
import UpdateSubject from "./components/Pages/Subjects/subject_crud/update";
import Semester from "./components/Pages/Semester/Semester";
import CreateSemester from "./components/Pages/Semester/semester_crud/add";
import UpdateSemester from "./components/Pages/Semester/semester_crud/update";
import Department from "./components/Pages/Department/Department";
import CreateDepartment from "./components/Pages/Department/department_crud/add";
import UpdateDepartment from "./components/Pages/Department/department_crud/update";
import Groups from "./components/Pages/Groups/Groups";
import CreateGroup from "./components/Pages/Groups/group_crud/add";
import CreateStudent from "./components/Pages/Student/Student_crud/add";
import CreateSingleStudent from "./components/Pages/Student/Student_crud/single_add.js";
import UpdateStudent from "./components/Pages/Student/Student_crud/update";
import CreateTeacher from "./components/Pages/Teacher/Teacher_crud/add";
import UpdateTeacher from "./components/Pages/Teacher/Teacher_crud/update";
import Students from "./components/Pages/Student/Student";
import TeacherAttendence from "./components/Pages/TeacherAttendence/TeacherAttendence";
import CreateStudentAttendence from "./components/Pages/StudentAttendence/Attendence_crud/add";
import CreateTeacherAttendence from "./components/Pages/TeacherAttendence/Attendence_crud/add";
import Teachers from "./components/Pages/Teacher/Teacher";

function App() {
  const authenticate = sessionStorage.getItem("accessToken");
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/"} element={<Login />} />
        <Route path={"/forgotPassword"} element={<ForgotPassword />} />
        <Route path={"/resetPassword"} element={<ResetPassword />} />
        <Route path={"/changePassword/:id"} element={<ChangePassword />} />
        <Route path={"/super-admin-ams"} element={<SuperAdmin />} />
        {authenticate ? (
          <>
            {" "}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path={`/`} element={<RootApp />}>
              <Route index element={<Dashboard />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/dashboard"} element={<Dashboard />} />
              <Route path={"/editProfile/:id"} element={<EditProfile />} />
              <Route path={"/editor"} element={<Editors />} />
              <Route path={"/agent"} element={<Agent />} />
              <Route path={"/editorAdd"} element={<AddEditors />} />
              <Route path={"/editor-update/:id"} element={<UpdateEditor />} />
              <Route path={"/guest"} element={<Guest />} />
              //--------------------New Rotes--------------------------------//
              <Route path={"/course-list"} element={<Course />} />
              <Route path={"/add-course"} element={<CreateCourse />} />
              <Route path={"/update-course/:id"} element={<UpdateCourse />} />
              <Route path={"/subject-list"} element={<Subject />} />
              <Route path={"/add-subject"} element={<CreateSubject />} />
              <Route path={"/update-subject/:id"} element={<UpdateSubject />} />
              <Route path={"/semester-list"} element={<Semester />} />
              <Route path={"/add-semester"} element={<CreateSemester />} />
              <Route
                path={"/update-semester/:id"}
                element={<UpdateSemester />}
              />
              <Route path={"/department-list"} element={<Department />} />
              <Route path={"/add-department"} element={<CreateDepartment />} />
              <Route
                path={"/update-department/:id"}
                element={<UpdateDepartment />}
              />
              <Route path={"/group-list"} element={<Groups />} />
              <Route path={"/add-group"} element={<CreateGroup />} />
              <Route path={"/add-student"} element={<CreateStudent />} />
              <Route
                path={"/add-single-student"}
                element={<CreateSingleStudent />}
              />
              <Route path={"/update-student/:id"} element={<UpdateStudent />} />
              <Route path={"/add-teacher"} element={<CreateTeacher />} />
              <Route path={"/update-teacher/:id"} element={<UpdateTeacher />} />
              <Route path={"/student-list"} element={<Students />} />
              <Route
                path={"/student-profile/:id/:course/:semester"}
                element={<StudentProfile />}
              />
              <Route
                path={"/teacher-profile/:id"}
                element={<TeacherProfile />}
              />
              <Route path={"/my-attendance"} element={<SelfAttendance />} />
              <Route
                path={"/student-attendance-list"}
                element={<CreateStudentAttendence />}
              />
              <Route
                path={"/teacher-attendance-list"}
                element={<TeacherAttendence />}
              />
              {/* <Route
                path={"/add-student-attendance"}
                element={<CreateStudentAttendence />}
              /> */}
              <Route
                path={"/add-teacher-attendance"}
                element={<CreateTeacherAttendence />}
              />
              <Route path={"/teacher-list"} element={<Teachers />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
