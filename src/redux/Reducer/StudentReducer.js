import {
  STUDENT_ADD_SUCCESS,
  STUDENT_GET_SUCCESS,
  STUDENT_DELETE_SUCCESS,
} from "../Constants/Constants";

let initState = {
  students: [],
};

const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case STUDENT_ADD_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case STUDENT_GET_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    case STUDENT_DELETE_SUCCESS:
      return {
        ...state,
        students: state?.students?.filter(
          (item) => item?._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default studentReducer;
