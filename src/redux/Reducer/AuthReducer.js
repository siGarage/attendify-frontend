import {
  LOGIN_USER_FETCH_ID_SUCCESS,
  USER_FETCH_SUCCESS,
  TEAM_LEADER_GET_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_FETCH_ID_SUCCESS,
  USER_FETCH_ROLE_FAIL,
  USER_FETCH_ROLE_REQUEST,
  USER_FETCH_ROLE_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_PROFILEUPDATE_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../Constants/Constants";

let initState = {
  users: {},
  teamLeader: [],
  getAllUsers: {},
};

const userAuthReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          users: [...state.users.users, action.payload],
        },
      };
    case TEAM_LEADER_GET_SUCCESS:
      return {
        ...state,
        teamLeader: action.payload,
      };

    // case USER_DELETE_SUCCESS:
    //     return ({
    //         ...state,
    //         users: {
    //             ...state.users,
    //             users: [...state.users.users, action.payload]
    //         }
    //     });

    case USER_FETCH_ROLE_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        getAllUsers: action.payload,
      };

    case USER_FETCH_ID_SUCCESS:
      return {
        ...state,
        user_by_id: action.payload,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        profile_user: action.payload,
      };

    // case USER_UPDATE_SUCCESS:
    //     return({
    //         ...state,
    //         users: action.payload
    //     })

    case USER_PROFILEUPDATE_SUCCESS:
      return {
        ...state,
        profileUsers: action.payload,
      };

    case LOGIN_USER_FETCH_ID_SUCCESS:
      return {
        ...state,
        loginUser: action.payload,
      };

    default:
      return state;
  }
};
export default userAuthReducer;
