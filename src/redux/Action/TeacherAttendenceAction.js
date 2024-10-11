import API from "../../service/API";
import {
  TEACHER_ATTENDANCE_UPDATE_FAILURE,
  TEACHER_ATTENDANCE_UPDATE_REQUEST,
  TEACHER_ATTENDANCE_UPDATE_SUCCESS,
  TEACHER_ATTENDANCE_DELETE_FAILURE,
  TEACHER_ATTENDANCE_DELETE_REQUEST,
  TEACHER_ATTENDANCE_DELETE_SUCCESS,
  TEACHER_ATTENDANCE_GET_REQUEST,
  TEACHER_ATTENDANCE_GET_FAILURE,
  TEACHER_ATTENDANCE_GET_SUCCESS,
  TEACHER_ATTENDANCE_ADD_FAILURE,
  TEACHER_ATTENDANCE_ADD_REQUEST,
  TEACHER_ATTENDANCE_ADD_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createTeacherAttendence =
  (teacherAttendence) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_ATTENDANCE_ADD_REQUEST });
      const { data } = await API.post(
        "/createTeacherAttendence",
        teacherAttendence
      );
      if (data.status_code == 201) {
        dispatch({
          type: TEACHER_ATTENDANCE_ADD_SUCCESS,
          payload: data?.teacherAttendence,
        });
        console.log("data", data.message);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      dispatch({
        type: TEACHER_ATTENDANCE_ADD_FAILURE,
      });
      toast.error(error?.message);
    }
  };

export const fetchTeachersAttendence = (values) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_ATTENDANCE_GET_REQUEST });
    const { data } = await API.post(`/getTeacherAttendences`, values);
    dispatch({ type: TEACHER_ATTENDANCE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEACHER_ATTENDANCE_GET_FAILURE,
    });
  }
};

export const teacherAttendenceDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_ATTENDANCE_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteTeacherAttendence?id=${id}`);
    toast.success("Teacher attendence deleted successfully.");
    dispatch({ type: TEACHER_ATTENDANCE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEACHER_ATTENDANCE_DELETE_FAILURE,
    });
  }
};

// export const examUpdate = (teacher) => async (dispatch) => {
//     try {
//         dispatch({ type: TEACHER_ATTENDANCE_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, teacher);
//         dispatch({ type: TEACHER_ATTENDANCE_UPDATE_SUCCESS, payload: data });
//         toast.success("teacher updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: TEACHER_ATTENDANCE_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
