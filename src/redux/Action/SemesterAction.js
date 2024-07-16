import API from "../../service/API";
import {
  SEMESTER_UPDATE_FAILURE,
  SEMESTER_UPDATE_REQUEST,
  SEMESTER_UPDATE_SUCCESS,
  SEMESTER_DELETE_FAILURE,
  SEMESTER_DELETE_REQUEST,
  SEMESTER_DELETE_SUCCESS,
  SEMESTER_GET_REQUEST,
  SEMESTER_GET_FAILURE,
  SEMESTER_GET_SUCCESS,
  SEMESTER_ADD_FAILURE,
  SEMESTER_ADD_REQUEST,
  SEMESTER_ADD_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createSemester = (semester) => async (dispatch) => {
  try {
    dispatch({ type: SEMESTER_ADD_REQUEST });
    const { data } = await API.post("/createSemester", semester);
    if (data.status_code == 201) {
      dispatch({ type: SEMESTER_ADD_SUCCESS, payload: data?.semester });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: SEMESTER_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};

export const fetchSemester = () => async (dispatch) => {
  try {
    dispatch({ type: SEMESTER_GET_REQUEST });
    const { data } = await API.get(`/getSemesters`);
    dispatch({ type: SEMESTER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEMESTER_GET_FAILURE,
    });
  }
};

export const semesterDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: SEMESTER_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteSemester?id=${id}`);
    toast.success("Semester deleted successfully.");
    dispatch({ type: SEMESTER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEMESTER_DELETE_FAILURE,
    });
  }
};

// export const examUpdate = (semester) => async (dispatch) => {
//     try {
//         dispatch({ type: SEMESTER_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, semester);
//         dispatch({ type: SEMESTER_UPDATE_SUCCESS, payload: data });
//         toast.success("semester updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: SEMESTER_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
