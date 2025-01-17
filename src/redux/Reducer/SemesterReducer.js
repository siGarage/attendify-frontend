import {
  SEMESTER_ADD_SUCCESS,
  SEMESTER_GET_SUCCESS,
  SEMESTER_DELETE_SUCCESS,
  SEMESTER_UPDATE_SUCCESS,
} from "../Constants/Constants";

let initState = {
  semesters: [],
};

const semesterReducer = (state = initState, action) => {
  switch (action.type) {
    case SEMESTER_ADD_SUCCESS:
      return {
        ...state,
        semesters: [...state.semesters, action.payload],
      };
    case SEMESTER_GET_SUCCESS:
      return {
        ...state,
        semesters: action.payload,
      };
    case SEMESTER_UPDATE_SUCCESS:
      return {
        ...state,
        semesters: state.semesters.map((item) =>
          item?._id == action.payload?._id ? { ...action.payload } : item
        ),
      };
    case SEMESTER_DELETE_SUCCESS:
      return {
        ...state,
        semesters: state?.semesters?.filter(
          (item) => item?._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default semesterReducer;
