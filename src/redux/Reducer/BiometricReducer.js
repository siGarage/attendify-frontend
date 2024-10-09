import {
    BIOMETRIC_GET_SUCCESS
  } from "../Constants/Constants";
  
  let initState = {
    bio: [],
  };
  
  const courseReducer = (state = initState, action) => {
    switch (action.type) {
      case BIOMETRIC_GET_SUCCESS:
        return {
          ...state,
          bio: action.payload,
        };
      default:
        return state;
    }
  };
  export default courseReducer;
  