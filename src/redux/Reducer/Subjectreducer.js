import {
    SUBJECT_ADD_SUCCESS,
    SUBJECT_GET_SUCCESS,
    SUBJECT_DELETE_SUCCESS,
  } from "../Constants/Constants";
  
  let initState = {
    subjects: [],
  };
  
  const subjectReducer = (state = initState, action) => {
    switch (action.type) {
      case SUBJECT_ADD_SUCCESS:
        return {
          ...state,
          subjects: [...state.subjects, action.payload],
        };
      case SUBJECT_GET_SUCCESS:
        return {
          ...state,
          subjects: action.payload,
        };
      case SUBJECT_DELETE_SUCCESS:
        return {
          ...state,
          subjects: state?.subjects?.filter(
            (item) => item?._id !== action.payload.id
          ),
        };
      default:
        return state;
    }
  };
  export default subjectReducer;
  