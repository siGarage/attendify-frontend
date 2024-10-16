import {
  STUDENT_ATTENDANCE_ADD_SUCCESS,
  STUDENT_ATTENDANCE_GET_SUCCESS,
  STUDENT_ATTENDANCE_DELETE_SUCCESS,
  SINGLE_STUDENT_ATTENDANCE_GET_FAILURE,
  SINGLE_STUDENT_ATTENDANCE_GET_REQUEST,
  SINGLE_STUDENT_ATTENDANCE_GET_SUCCESS,
  TODAY_STUDENT_ATTENDANCE_GET_SUCCESS,
  MONTHLY_ATTENDANCE_GET_SUCCESS,
} from "../Constants/Constants";

let initState = {
  studentsAttendence: [],
  singleStudentAttendance: [],
  todayAttendance: [],
  monthlyAttendence: [],
};

const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case STUDENT_ATTENDANCE_ADD_SUCCESS:
      return {
        ...state,
        studentsAttendence: [...state.studentsAttendence, action.payload],
      };
    case SINGLE_STUDENT_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        singleStudentAttendance: [action.payload],
      };
    case STUDENT_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        studentsAttendence: action.payload,
      };
    case STUDENT_ATTENDANCE_DELETE_SUCCESS:
      return {
        ...state,
        studentsAttendence: state?.studentsAttendence?.filter(
          (item) => item?._id !== action.payload.id
        ),
      };
    case TODAY_STUDENT_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        todayAttendance: [action.payload],
      };
    case MONTHLY_ATTENDANCE_GET_SUCCESS:
      return {
        ...state,
        monthlyAttendence: [...action.payload],
      };
    default:
      return state;
  }
};
export default studentReducer;
