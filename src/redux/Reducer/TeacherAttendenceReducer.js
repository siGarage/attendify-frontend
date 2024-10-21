import {
  TEACHER_ATTENDANCE_ADD_SUCCESS,
  TEACHER_ATTENDANCE_GET_SUCCESS,
  TEACHER_ATTENDANCE_DELETE_SUCCESS,
  SINGLE_TEACHER_ATTENDANCE_GET_SUCCESS,
} from "../Constants/Constants";

let initState = {
  teachersAttendence: [],
  singleTeacherAttendance: [],
};

const teacherReducer = (state = initState, action) => {
  switch (action.type) {
    case TEACHER_ATTENDANCE_ADD_SUCCESS:
      return {
        ...state,
        teachersAttendence: [...state.teachersAttendence, action.payload],
      };
    case SINGLE_TEACHER_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        singleTeacherAttendance: [action.payload],
      };
    case TEACHER_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        teachersAttendence: action.payload,
      };
    case TEACHER_ATTENDANCE_DELETE_SUCCESS:
      return {
        ...state,
        teachers: state?.teachers?.filter(
          (item) => item?._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default teacherReducer;
