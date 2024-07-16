import { combineReducers } from "redux";
import userAuthReducer from "./Reducer/AuthReducer";
import courseReducer from "./Reducer/CourseReducer";
import subjectReducer from "./Reducer/Subjectreducer";
import semesterReducer from "./Reducer/SemesterReducer";
import groupReducer from "./Reducer/GroupReducer";
import studentReducer from "./Reducer/StudentReducer";
import studentAttendenceReducer from "./Reducer/StudentAttendenceReducer";
import teacherAttendenceReducer from "./Reducer/TeacherAttendenceReducer";
import teacherReducer from "./Reducer/TeacherReducer";
import departmentReducer from "./Reducer/DepartmentReducer";
const reducer = combineReducers({
  userAuth: userAuthReducer,
  courses: courseReducer,
  subjects: subjectReducer,
  semesters: semesterReducer,
  groups: groupReducer,
  students: studentReducer,
  studentsAttendence: studentAttendenceReducer,
  teachersAttendence: teacherAttendenceReducer,
  departments:departmentReducer,
  teachers: teacherReducer,
});
export default reducer;
