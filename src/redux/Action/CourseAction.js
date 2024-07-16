import API from "../../service/API";
import {
  COURSE_UPDATE_FAILURE,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_DELETE_FAILURE,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_GET_REQUEST,
  COURSE_GET_FAILURE,
  COURSE_GET_SUCCESS,
  COURSE_ADD_FAILURE,
  COURSE_ADD_REQUEST,
  COURSE_ADD_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_ADD_REQUEST });
    const { data } = await API.post("/createCourse", course);
    if (data.status_code == 201) {
      dispatch({ type: COURSE_ADD_SUCCESS, payload: data?.course });
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    dispatch({
      type: COURSE_ADD_FAILURE,
    });
    toast.error(error?.message);
  }
};
export const fetchCourse = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_REQUEST });
    const { data } = await API.get(`/getCourses`);
    dispatch({ type: COURSE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_FAILURE,
    });
  }
};

export const courseDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteCourse?id=${id}`);
    toast.success("Course deleted successfully.");
    dispatch({ type: COURSE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAILURE,
    });
  }
};

// export const examUpdate = (course) => async (dispatch) => {
//     try {
//         dispatch({ type: COURSE_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, course);
//         dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
//         toast.success("course updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: COURSE_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
