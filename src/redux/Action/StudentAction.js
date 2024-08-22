import API from "../../service/API";
import {
  STUDENT_UPDATE_FAILURE,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_DELETE_FAILURE,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_GET_REQUEST,
  STUDENT_GET_FAILURE,
  STUDENT_GET_SUCCESS,
  STUDENT_ADD_FAILURE,
  STUDENT_ADD_REQUEST,
  STUDENT_ADD_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createStudent = (student) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_ADD_REQUEST });
    const { data } = await API.post("/createStudent", student);
    if (data.status_code == 201) {
      dispatch({ type: STUDENT_ADD_SUCCESS, payload: data?.student });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: STUDENT_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};
//Add Status action
export const createStudentByCSV = (student) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_ADD_REQUEST });
    const { data } = await API.post("/createStudentByCSV", student);
    if (data.status_code == 201) {
      dispatch({ type: STUDENT_ADD_SUCCESS, payload: data?.student });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: STUDENT_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};

export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_GET_REQUEST });
    const { data } = await API.get(`/getStudents`);
    dispatch({ type: STUDENT_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_GET_FAILURE,
    });
  }
};

export const studentDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteStudent?id=${id}`);
    toast.success("Student deleted successfully.");
    dispatch({ type: STUDENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAILURE,
    });
  }
};

export const updateStudent = (student) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });
    const { data } = await API.put(`/updateStudent`, student);
    dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: data });
    toast.success("Student updated successfully.");
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: STUDENT_UPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};
