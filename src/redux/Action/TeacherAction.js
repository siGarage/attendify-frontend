import API from "../../service/API";
import {
  TEACHER_UPDATE_FAILURE,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_DELETE_FAILURE,
  TEACHER_DELETE_REQUEST,
  TEACHER_DELETE_SUCCESS,
  TEACHER_GET_REQUEST,
  TEACHER_GET_FAILURE,
  TEACHER_GET_SUCCESS,
  TEACHER_ADD_FAILURE,
  TEACHER_ADD_REQUEST,
  TEACHER_ADD_SUCCESS,
} from "../Constants/Constants";
import { toast } from "react-toastify";

//Add Status action
export const createTeacher = (teacher) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_ADD_REQUEST });
    const { data } = await API.post("/createTeacher", teacher);
    if (data.status_code == 201) {
      dispatch({ type: TEACHER_ADD_SUCCESS, payload: data?.teacher });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: TEACHER_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};

export const fetchTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_GET_REQUEST });
    const { data } = await API.get(`/getTeachers`);
    dispatch({ type: TEACHER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEACHER_GET_FAILURE,
    });
  }
};

export const teacherDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteTeacher?id=${id}`);
    toast.success("Teacher deleted successfully.");
    dispatch({ type: TEACHER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEACHER_DELETE_FAILURE,
    });
  }
};
export const updateTeacher = (uData) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_UPDATE_REQUEST });
    const { data } = await API.put(`/updateTeacher`, uData);
    toast.success("Teacher update successfully.");
    dispatch({ type: TEACHER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEACHER_UPDATE_FAILURE,
    });
  }
};

// export const examUpdate = (TEACHER) => async (dispatch) => {
//     try {
//         dispatch({ type: TEACHER_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, TEACHER);
//         dispatch({ type: TEACHER_UPDATE_SUCCESS, payload: data });
//         toast.success("TEACHER updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: TEACHER_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
