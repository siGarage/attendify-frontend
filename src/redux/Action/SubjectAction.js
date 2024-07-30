import API from "../../service/API";
import {
  SUBJECT_UPDATE_FAILURE,
  SUBJECT_UPDATE_REQUEST,
  SUBJECT_UPDATE_SUCCESS,
  SUBJECT_DELETE_FAILURE,
  SUBJECT_DELETE_REQUEST,
  SUBJECT_DELETE_SUCCESS,
  SUBJECT_GET_REQUEST,
  SUBJECT_GET_FAILURE,
  SUBJECT_GET_SUCCESS,
  SUBJECT_ADD_FAILURE,
  SUBJECT_ADD_REQUEST,
  SUBJECT_ADD_SUCCESS,
} from "../Constants/Constants";
import { toast } from "react-toastify";

//Add Status action
export const createSubject = (subject) => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_ADD_REQUEST });
    const { data } = await API.post("/createSubject", subject);
    if (data.status_code == 201) {
      dispatch({ type: SUBJECT_ADD_SUCCESS, payload: data?.subject });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: SUBJECT_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};

export const fetchSubject = () => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_GET_REQUEST });
    const { data } = await API.get(`/getSubjects`);
    dispatch({ type: SUBJECT_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBJECT_GET_FAILURE,
    });
  }
};

export const subjectDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteSubject?id=${id}`);
    toast.success("Subject deleted successfully.");
    dispatch({ type: SUBJECT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBJECT_DELETE_FAILURE,
    });
  }
};

export const updateSubject = (SUBJECT) => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_UPDATE_REQUEST });
    const { data } = await API.put(`/updateSubject`, SUBJECT);
    dispatch({ type: SUBJECT_UPDATE_SUCCESS, payload: data.subject_u });
    toast.success("Subject updated successfully.");
    return data;
  } catch (error) {
    console.log(error, "error");
    toast.error(error);
    dispatch({
      type: SUBJECT_UPDATE_FAILURE,
      // payload: error.message && error.message ? error.message : '',
    });
  }
};
