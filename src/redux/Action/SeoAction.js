import API from "../../service/API";
import { SEO_UPDATE_REQUEST, SEO_UPDATE_SUCCESS, SEO_UPDATE_FAILURE, SEO_DELETE_FAILURE, SEO_DELETE_REQUEST,SEO_DELETE_SUCCESS, SEO_ADD_FAILURE, SEO_ADD_REQUEST,SEO_ADD_SUCCESS, SEO_GET_FAILURE, SEO_GET_REQUEST, SEO_GET_SUCCESS, CATEGORY_SOFT_DELETE_FAILURE, CATEGORY_SOFT_DELETE_SUCCESS, CATEGORY_SOFT_DELETE_REQUEST, CATEGORY_ADD_REQUEST, CATEGORY_UPDATE_FAILURE, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_REQUEST, CATEGORY_ADD_FAILURE, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAILURE, CATEGORY_ADD_SUCCESS, CATEGORY_GET_REQUEST, CATEGORY_GET_SUCCESS, CATEGORY_GET_FAILURE } from "../Constants/Constants";
import { ToastContainer, toast } from 'react-toastify';

//Add Status action
export const createSeo = (news) => async (dispatch) => {
    try {
        dispatch({ type: SEO_ADD_REQUEST });
        const { data } = await API.post(`/createSeo`, news);
        if (data.status_code == 200) {
            dispatch({ type: SEO_ADD_REQUEST, payload: data?.seo });
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: SEO_ADD_FAILURE
        });
        toast.error(error?.message)
    }
};
export const fetchSeo = () => async (dispatch) => {
    try {
        dispatch({ type: SEO_GET_REQUEST });
        const { data } = await API.get(`/getSeo`);
        dispatch({ type: SEO_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SEO_GET_FAILURE,
        });
    }
};

export const seoDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: SEO_DELETE_REQUEST });
        const { data } = await API.delete(`/deleteSeo?id=${id}`);
        toast.success("Seo deleted successfully.");
        dispatch({ type: SEO_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SEO_DELETE_FAILURE,
        });
    }
};

export const  updateSeo = (user) => async (dispatch) => {
    try {
      dispatch({ type: SEO_UPDATE_REQUEST });
      const { data } = await API.put(`/seoUpdate`, user);
      dispatch({ type: SEO_UPDATE_SUCCESS, payload: data });
      toast.success("Seo updated successfully.")
      return data
    } catch (error) {
      console.log(error, "error")
      toast.error(error)
      dispatch({
        type: SEO_UPDATE_FAILURE,
        // payload: error.message && error.message ? error.message : '',
      });
    }
  };