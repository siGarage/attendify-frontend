import API from "../../service/API";
import {
  DEPARTMENT_UPDATE_FAILURE,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_DELETE_FAILURE,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_GET_REQUEST,
  DEPARTMENT_GET_FAILURE,
  DEPARTMENT_GET_SUCCESS,
  DEPARTMENT_ADD_FAILURE,
  DEPARTMENT_ADD_REQUEST,
  DEPARTMENT_ADD_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createDepartment = (department) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_ADD_REQUEST });
    const { data } = await API.post("/createDepartment", department);
    if (data.status_code == 201) {
      dispatch({ type: DEPARTMENT_ADD_SUCCESS, payload: data?.department });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: DEPARTMENT_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};
export const fetchDepartment = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_GET_REQUEST });
    const { data } = await API.get(`/getDepartments`);
    dispatch({ type: DEPARTMENT_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_GET_FAILURE,
    });
  }
};

export const departmentDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteDepartment?id=${id}`);
    toast.success("Department deleted successfully.");
    dispatch({ type: DEPARTMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_DELETE_FAILURE,
    });
  }
};

export const updateDepartment = (department) => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_UPDATE_REQUEST });
    const { data } = await API.put(`/updateDepartment`, department);
    dispatch({ type: DEPARTMENT_UPDATE_SUCCESS, payload: data });
    toast.success("Department updated successfully.");
    return data;
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: DEPARTMENT_UPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};
