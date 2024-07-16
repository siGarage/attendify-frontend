import {
    DEPARTMENT_ADD_SUCCESS,
    DEPARTMENT_GET_SUCCESS,
    DEPARTMENT_DELETE_SUCCESS,
  } from "../Constants/Constants";
  
  let initState = {
    departments: [],
  };
  
  const departmentReducer = (state = initState, action) => {
    switch (action.type) {
      case DEPARTMENT_ADD_SUCCESS:
        return {
          ...state,
          departments: [...state.departments, action.payload],
        };
      case DEPARTMENT_GET_SUCCESS:
        return {
          ...state,
          departments: action.payload,
        };
      case DEPARTMENT_DELETE_SUCCESS:
        return {
          ...state,
          departments: state?.departments?.filter(
            (item) => item?._id !== action.payload.id
          ),
        };
      default:
        return state;
    }
  };
  export default departmentReducer;
  