import API from "../../service/API";
//import axios from "axios";
import {
  TEAM_LEADER_ADD_REQUEST,
  TEAM_LEAD_UPDATE_REQUEST,
  USER_FETCH_FAILURE,
  USER_FETCH_SUCCESS,
  USER_FETCH_REQUEST,
  TEAM_LEAD_UPDATE_SUCCESS,
  TEAM_LEAD_UPDATE_FAILURE,
  TEAM_LEAD_DELETE_REQUEST,
  TEAM_LEAD_DELETE_FAILURE,
  TEAM_LEAD_DELETE_SUCCESS,
  TEAM_LEADER_GET_SUCCESS,
  TEAM_LEADER_GET_FAILURE,
  TEAM_LEADER_GET_REQUEST,
  TEAM_LEADER_ADD_FAILURE,
  TEAM_LEADER_ADD_SUCCESS,
  LOGIN_USER_FETCH_ID_FAILURE,
  LOGIN_USER_FETCH_ID_REQUEST,
  LOGIN_USER_FETCH_ID_SUCCESS,
  USER_CHANGE_PASS_FAILURE,
  USER_CHANGE_PASS_REQUEST,
  USER_CHANGE_PASS_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_FETCH_ID_FAILURE,
  USER_FETCH_ID_REQUEST,
  USER_FETCH_ID_SUCCESS,
  USER_FETCH_ROLE_FAILURE,
  USER_FETCH_ROLE_REQUEST,
  USER_FETCH_ROLE_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_MAIL_FAILURE,
  USER_MAIL_REQUEST,
  USER_MAIL_SUCCESS,
  USER_PROFILEUPDATE_FAILURE,
  USER_PROFILEUPDATE_REQUEST,
  USER_PROFILEUPDATE_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_FAILURE,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_APPROVAL_STATUS_REQUEST,
  USER_APPROVAL_STATUS_SUCCESS,
  USER_APPROVAL_STATUS_FAILURE,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//register action
export const register = (userInfo, forregister) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await API.post(`/userCreate`, userInfo);
    toast.success("User added successfully.");
    // if (data.status_code) {
    // if (forregister == "register") {
    //   sessionStorage.setItem("accessToken", data?.data?.token);
    //   sessionStorage.setItem("userId", data?.data?.responseUser?._id);
    //   sessionStorage.setItem("name", data?.data?.responseUser?.name);
    //   sessionStorage.setItem("role", data?.data?.responseUser?.role);
    //   sessionStorage.setItem("email", data?.data?.responseUser?.email);
    //   sessionStorage.setItem("contact_no", data?.data?.responseUser?.contact_no);
    //   sessionStorage.setItem("createdAt", data?.data?.responseUser?.created_at);
    //   sessionStorage.setItem("image", data?.data?.responseUser?.image);
    //   window.location.href = '/dashboard';
    // } else {
    //   dispatch({ type: USER_REGISTER_SUCCESS, payload: data?.data });
    // }
    // } else {
    //   toast.error(data?.message)
    // }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//login action
export const login = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await API.post(`/userLogin`, userInfo);
    dispatch({ type: USER_LOGIN_SUCCESS });
    if (data.status_text == "success") {
      sessionStorage.setItem("accessToken", data?.data?.token);
      sessionStorage.setItem("userId", data?.data?.responseUser?._id);
      sessionStorage.setItem("name", data?.data?.responseUser?.name);
      sessionStorage.setItem("role", data?.data?.responseUser?.role);
      sessionStorage.setItem("email", data?.data?.responseUser?.email);
      sessionStorage.setItem(
        "contact_no",
        data?.data?.responseUser?.contact_no
      );
      sessionStorage.setItem("createdAt", data?.data?.responseUser?.created_at);
      window.location.href = "/dashboard";
    } else {
      toast("Invalid Credentials");
    }
    // if (data.message == "The selected email is invalid" || "Password Incorrect!") {
    //   toast("Invalid Credentials");
    // } else if (data.status_text=="success") {
    //   sessionStorage.setItem("accessToken", data?.data?.token);
    //   sessionStorage.setItem("userId", data?.data?.responseUser?._id);
    //   sessionStorage.setItem("name", data?.data?.responseUser?.name);
    //   sessionStorage.setItem("email", data?.data?.responseUser?.email);
    //   sessionStorage.setItem(
    //     "contact_no",
    //     data?.data?.responseUser?.contact_no
    //   );
    //   sessionStorage.setItem("createdAt", data?.data?.responseUser?.created_at);
    //   // window.location.href = "/dashboard";
    // } else {
    //   toast("Invalid Credentials");
    // }
    // // if (data?.data?.accessToken) {
    // //   window.location.href = '/dashboard';
    // // }
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: USER_LOGIN_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//Forget action
export const sendEmail = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_MAIL_REQUEST });
    const { data } = await API.post(`/sendMail`, userInfo);
    dispatch({ type: USER_MAIL_SUCCESS });
    if (data.status_code) {
      sessionStorage.setItem("email", data?.data?.email);
      window.location.href = "/resetPassword";
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: USER_MAIL_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//Forget action
export const resetPass = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_REQUEST });
    const { data } = await API.put(`/forget-password`, userInfo);
    dispatch({ type: USER_RESET_SUCCESS });
    if (data.status_code) {
      window.location.href = "/";
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: USER_RESET_FAILURE,
    });
  }
};

//Change pass action
export const changePass = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASS_REQUEST });
    const { data } = await API.put(`/reset-password`, {
      email: sessionStorage.getItem("email"),
    });
    dispatch({ type: USER_CHANGE_PASS_SUCCESS });
    if (data.status_code) {
      toast.success(data?.message);
    } else {
      toast.success(data?.message);
    }
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: USER_CHANGE_PASS_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//Change pass action
export const changePassDone = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASS_REQUEST });
    const { data } = await API.post(`/change-password`, userInfo);
    if (data.status_text == "success") {
      sessionStorage.clear();
      window.location.reload(false);
      window.location.href = "/";
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log("error", error);

    dispatch({
      type: USER_CHANGE_PASS_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//fetchUser pass action
export const fetchUserByRole = (role) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCH_ROLE_REQUEST });
    const { data } = await API.post("/getAllUser", { role: role });
    dispatch({ type: USER_FETCH_ROLE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_FETCH_ROLE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//fetchUser pass action
export const fetchUsers = (role) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCH_REQUEST });
    const { data } = await API.get("/getUsers");
    dispatch({ type: USER_FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_FETCH_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//
export const fetchUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCH_ID_REQUEST });
    const { data } = await API.post(`/getUserById`, { id: id });
    dispatch({ type: USER_FETCH_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_FETCH_ID_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

export const fetchLoginUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_FETCH_ID_REQUEST });
    const { data } = await API.post(`/getUserById`, { id: id });
    dispatch({ type: LOGIN_USER_FETCH_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: LOGIN_USER_FETCH_ID_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//userDelete pass action
export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const { data } = await API.delete(`/userDelete?id=${id}`);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    toast.success("User deleted successfully.");
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_DELETE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//userUpdate pass action
export const userUpdate = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = await API.put(`/userUpdate`, user);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    toast.success("User updated successfully.");
    return data;
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_UPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};
export const upadateApprovalStatus = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_APPROVAL_STATUS_REQUEST });
    const { data } = await API.post(`/upadateApprovalStatus`, user);
    dispatch({ type: USER_APPROVAL_STATUS_SUCCESS, payload: data });
    toast.success(data?.message);
    return data;
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_APPROVAL_STATUS_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

//userProfile
export const userProfileUpdate = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILEUPDATE_REQUEST });
    const { data } = await API.put(`/userProfileUpdate`, user);
    dispatch({ type: USER_PROFILEUPDATE_SUCCESS, payload: data });
    toast.success("User updated successfully.");
    if (data) {
      window.location.href = `/profile`;
    }
    return data;
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: USER_PROFILEUPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};
export const userListUpdate = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = await API.put(`/userListUpdate`, user);
    // dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    toast.success("User updated successfully.");
  } catch (error) {
    toast.error(error);
    dispatch({
      type: USER_UPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

export const createTeamLeader = (user) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_LEADER_ADD_REQUEST });
    const { data } = await API.post(`/createUserTeamLeader`, user);
    dispatch({ type: TEAM_LEADER_ADD_SUCCESS, payload: data });
    toast.success("Team Leader Add Successfully.");
    if (data.teamLeader.type == "Caller") {
      window.location.href = "/callerTeamList";
    } else if (data.teamLeader.type == "Editor") {
      window.location.href = "/editorTeamList";
    }
  } catch (error) {
    toast.error(error);
    dispatch({
      type: TEAM_LEADER_ADD_FAILURE,
      payload: error.message && error.message ? error.message : "",
    });
  }
};
export const getTeamLeader = () => async (dispatch) => {
  try {
    dispatch({ type: TEAM_LEADER_GET_REQUEST });
    const { data } = await API.get(`/getUserTeamLeader`);
    dispatch({ type: TEAM_LEADER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEAM_LEADER_GET_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

export const teamLeadDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_LEAD_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteTeamLead?id=${id}`);
    // dispatch({ type: CATEGORY_DELETE_SUCCESS, payload:data?.id });
    toast.success("Team Leader deleted successfully.");
    return;
  } catch (error) {
    dispatch({
      type: TEAM_LEAD_DELETE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};

export const updateTeamLead = (teamLead) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_LEAD_UPDATE_REQUEST });
    const { data } = await API.post(`/updateTeamLead`, teamLead);
    console.log(data);
    if (data.status_code == 200) {
      dispatch({ type: TEAM_LEAD_UPDATE_SUCCESS, payload: data?.category });
      toast.success(data?.message);
      if (data.teamLeader.type == "Caller") {
        window.location.href = "/callerTeamList";
      } else if (data.teamLeader.type == "Editor") {
        window.location.href = "/editorTeamList";
      }
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: TEAM_LEAD_UPDATE_FAILURE,
    });
    toast.error(error?.message);
  }
};
