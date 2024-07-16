import {
  COURSE_ADD_SUCCESS,
  COURSE_GET_SUCCESS,
  COURSE_DELETE_SUCCESS,
} from "../Constants/Constants";

let initState = {
  courses: [],
};

const courseReducer = (state = initState, action) => {
  switch (action.type) {
    case COURSE_ADD_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case COURSE_GET_SUCCESS:
      return {
        ...state,
        courses: action.payload,
      };
    case COURSE_DELETE_SUCCESS:
      return {
        ...state,
        courses: state?.courses?.filter(
          (item) => item?._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default courseReducer;
