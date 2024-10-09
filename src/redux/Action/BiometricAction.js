import API from "../../service/API";
import {
    BIOMETRIC_GET_FAILURE,
    BIOMETRIC_GET_REQUEST,
    BIOMETRIC_GET_SUCCESS,
} from "../Constants/Constants";
import { ToastContainer, toast } from "react-toastify";

export const fetchBiometric = () => async (dispatch) => {
  try {
    dispatch({ type: BIOMETRIC_GET_REQUEST });
    const { data } = await API.get(`/getBiometrics`);
    dispatch({ type: BIOMETRIC_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BIOMETRIC_GET_FAILURE,
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
