import API from "../../service/API";
import {
  STUDENT_ATTENDANCE_UPDATE_FAILURE,
  STUDENT_ATTENDANCE_UPDATE_REQUEST,
  STUDENT_ATTENDANCE_UPDATE_SUCCESS,
  STUDENT_ATTENDANCE_DELETE_FAILURE,
  STUDENT_ATTENDANCE_DELETE_REQUEST,
  STUDENT_ATTENDANCE_DELETE_SUCCESS,
  STUDENT_ATTENDANCE_GET_REQUEST,
  STUDENT_ATTENDANCE_GET_FAILURE,
  STUDENT_ATTENDANCE_GET_SUCCESS,
  STUDENT_ATTENDANCE_ADD_FAILURE,
  STUDENT_ATTENDANCE_ADD_REQUEST,
  STUDENT_ATTENDANCE_ADD_SUCCESS,
  SINGLE_STUDENT_ATTENDANCE_GET_FAILURE,
  SINGLE_STUDENT_ATTENDANCE_GET_SUCCESS,
  SINGLE_STUDENT_ATTENDANCE_GET_REQUEST,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

//Add Status action
export const createStudentAttendence =
  (studentAttendence) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_ATTENDANCE_ADD_REQUEST });
      const { data } = await API.post(
        "/createStudentAttendence",
        studentAttendence
      );
      if (data.status_code == 201) {
        dispatch({
          type: STUDENT_ATTENDANCE_ADD_SUCCESS,
          payload: data?.studentAttendence,
        });
        console.log("data", data.message);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      dispatch({
        type: STUDENT_ATTENDANCE_ADD_FAILURE,
      });
      toast.error(error?.message);
    }
  };

export const createStudentAttendenceByCsv =
  (Attendence) => async (dispatch) => {
    try {
      // dispatch({ type: PROPERTY_GALLERY_ADD_REQUEST });
      const { data } = await API.post(`/createAttendenceByCsv`, Attendence);
      if (data.status_code == 201) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      // dispatch({
      //   type: PROPERTY_GALLERY_ADD_FAILURE,
      // });
      toast.error(error?.message);
    }
  };

export const fetchStudentsAttendence = (values) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_ATTENDANCE_GET_REQUEST });
    const { data } = await API.post(`/fetchStudentAttendences`, values);
    dispatch({ type: STUDENT_ATTENDANCE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_ATTENDANCE_GET_FAILURE,
    });
  }
};

export const fetchSingleStudentsAttendence = (values) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_STUDENT_ATTENDANCE_GET_REQUEST });
    const { data } = await API.post(`/fetchSingleStudentAttendences`, values);
    dispatch({ type: SINGLE_STUDENT_ATTENDANCE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_STUDENT_ATTENDANCE_GET_FAILURE,
    });
  }
};

export const studentAttendenceDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_ATTENDANCE_DELETE_REQUEST });
    const { data } = await API.delete(`/deleteStudentAttendence?id=${id}`);
    toast.success("Student deleted successfully.");
    dispatch({ type: STUDENT_ATTENDANCE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_ATTENDANCE_DELETE_FAILURE,
    });
  }
};

// export const examUpdate = (student) => async (dispatch) => {
//     try {
//         dispatch({ type: STUDENT_ATTENDANCE_UPDATE_REQUEST });
//         const { data } = await API.put(`/examUpdate`, student);
//         dispatch({ type: STUDENT_ATTENDANCE_UPDATE_SUCCESS, payload: data });
//         toast.success("student updated successfully.")
//         return data
//     } catch (error) {
//         console.log(error, "error")
//         toast.error(error)
//         dispatch({
//             type: STUDENT_ATTENDANCE_UPDATE_FAILURE,
//             // payload: error.message && error.message ? error.message : '',
//         });
//     }
// };
