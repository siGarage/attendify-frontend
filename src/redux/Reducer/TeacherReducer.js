import {
  TEACHER_ADD_SUCCESS,
  TEACHER_GET_SUCCESS,
  TEACHER_DELETE_SUCCESS,
  TEACHER_UPDATE_SUCCESS,
} from "../Constants/Constants";

let initState = {
  teachers: [],
};

const teacherReducer = (state = initState, action) => {
  switch (action.type) {
    case TEACHER_ADD_SUCCESS:
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case TEACHER_GET_SUCCESS:
      return {
        ...state,
        teachers: action.payload,
      };
    case TEACHER_UPDATE_SUCCESS:
      return {
        ...state,
        exams: state.teachers.map((item) =>
          item?._id == action.payload?._id ? { ...action.payload } : item
        ),
      };
    case TEACHER_DELETE_SUCCESS:
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
