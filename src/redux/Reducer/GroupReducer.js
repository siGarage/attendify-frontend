import {
  GROUP_ADD_SUCCESS,
  GROUP_GET_SUCCESS,
  DASHBOARD_GET_SUCCESS,
} from "../Constants/Constants";

let initState = {
  groups: [],
  dashboardData: {},
};

const groupReducer = (state = initState, action) => {
  switch (action.type) {
    case GROUP_ADD_SUCCESS:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case DASHBOARD_GET_SUCCESS:
      return {
        ...state,
        dashboardData: { ...action.payload },
      };
    case GROUP_GET_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
};
export default groupReducer;
