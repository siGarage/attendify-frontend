import API from "../../service/API";
import {
  GROUP_ADD_FAILURE,
  GROUP_ADD_REQUEST,
  GROUP_ADD_SUCCESS,
  GROUP_GET_FAILURE,
  GROUP_GET_SUCCESS,
  GROUP_GET_REQUEST,
  DASHBOARD_GET_REQUEST,
  DASHBOARD_GET_SUCCESS,
  DASHBOARD_GET_FAILURE
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createGroup = (group) => async (dispatch) => {
  try {
    dispatch({ type: GROUP_ADD_REQUEST });
    const { data } = await API.post("/createGroup", group);
    if (data.status_code == 201) {
      dispatch({ type: GROUP_ADD_SUCCESS, payload: data?.group });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: GROUP_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};
export const fetchGroups = () => async (dispatch) => {
  try {
    dispatch({ type: GROUP_GET_REQUEST });
    const { data } = await API.get(`/getGroups`);
    dispatch({ type: GROUP_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GROUP_GET_FAILURE,
    });
  }
};
export const fetchDashboardData= () => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_GET_REQUEST });
    const { data } = await API.get(`/dashboardData`);
    dispatch({ type: DASHBOARD_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DASHBOARD_GET_FAILURE,
    });
  }
};

// export const examDelete = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: EXAM_DELETE_REQUEST });
//         const { data } = await API.delete(`/deleteGroup?id=${id}`);
//         toast.success("Group deleted successfully.");
//         dispatch({ type: EXAM_DELETE_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: EXAM_DELETE_FAILURE,
//         });
//     }
// };

// export const examUpdate = (exam) => async (dispatch) => {
//     try {
//         dispatch({ type: EXAM_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, exam);
//         dispatch({ type: EXAM_UPDATE_SUCCESS, payload: data });
//         toast.success("Group updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: EXAM_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
