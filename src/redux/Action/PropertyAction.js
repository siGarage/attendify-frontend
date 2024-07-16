import API from "../../service/API";
import { REVIEW_DELETE_REQUEST,REVIEW_UPDATE_REQUEST,REVIEW_UPDATE_SUCCESS,REVIEW_UPDATE_FAILURE,REVIEW_DELETE_SUCCESS,REVIEW_DELETE_FAILURE,GET_REVIEWS_LIST,FAILURE_REVIEWS_LIST,SUCCESS_REVIEWS_LIST,REVIEW_ADD_FAILURE, REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, FAILURE_FAQS_LIST, SUCCESS_FAQS_LIST, GET_FAQS_LIST, REPLACE_GALLERY_IMAGE_FAILURE, REPLACE_GALLERY_IMAGE_SUCCESS, REPLACE_GALLERY_IMAGE_REQUEST, DELETE_GALLERY_IMAGE_FAILURE, DELETE_GALLERY_IMAGE_SUCCESS, DELETE_GALLERY_IMAGE_REQUEST, EDIT_GALLERY_IMAGE_FAILURE, EDIT_GALLERY_IMAGE_SUCCESS, EDIT_GALLERY_IMAGE_REQUEST, PROPERTY_GALLERY_ADD_FAILURE, PROPERTY_GALLERY_ADD_SUCCESS, PROPERTY_GALLERY_ADD_REQUEST, FAILURE_GALLERY_LIST, SUCCESS_GALLERY_LIST, GET_GALLERY_LIST, PROPERTY_UPDATE_FAILURE, PROPERTY_UPDATE_REQUEST, PROPERTY_UPDATE_SUCCESS, PROPERTY_DELETE_REQUEST, PROPERTY_DELETE_FAILURE, PROPERTY_DELETE_SUCCESS, NEWS_UPDATE_REQUEST, NEWS_UPDATE_SUCCESS, NEWS_UPDATE_FAILURE, PROPERTY_ADD_FAILURE, PROPERTY_ADD_REQUEST, PROPERTY_ADD_SUCCESS, PROPERTY_GET_FAILURE, PROPERTY_GET_REQUEST, PROPERTY_GET_SUCCESS } from "../Constants/Constants";
import { ToastContainer, toast } from 'react-toastify';

//Add Status action
export const createProperty = (school) => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_ADD_REQUEST })
        const { data } = await API.post('/createProperty', school);
        if (data.status_code == 200) {
            dispatch({ type: PROPERTY_ADD_SUCCESS, payload: data?.property });
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: PROPERTY_ADD_FAILURE
        });
        toast.error(error?.message)
    }
};
export const fetchProperty = () => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_GET_REQUEST });
        const { data } = await API.get(`/getProperty`);
        dispatch({ type: PROPERTY_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROPERTY_GET_FAILURE,
        });
    }
};

export const propertyDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_DELETE_REQUEST });
        const { data } = await API.delete(`/deleteProperty?id=${id}`);
        toast.success("Property deleted successfully.");
        dispatch({ type: PROPERTY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROPERTY_DELETE_FAILURE,
        });
    }
};

export const propertyUpdate = (user) => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_UPDATE_REQUEST });
        const { data } = await API.put(`/propertyUpdate`, user);
        dispatch({ type: PROPERTY_UPDATE_SUCCESS, payload: data });
        toast.success("Property updated successfully.")
        return data;
    } catch (error) {
        toast.error(error)
        dispatch({
            type: PROPERTY_UPDATE_FAILURE,
            // payload: error.message && error.message ? error.message : '',
        });
    }
};


//Add createGallery action
export const createGallery = (property) => async (dispatch) => {
    try {
        dispatch({ type: PROPERTY_GALLERY_ADD_REQUEST });
        const { data } = await API.post(`/createGallery`, property);
        if (data.status_code == 200) {
            dispatch({ type: PROPERTY_GALLERY_ADD_SUCCESS, payload: data?.gallery });
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: PROPERTY_GALLERY_ADD_FAILURE
        });
        toast.error(error?.message)
    }
};

//Get Gallery  
export const getGallery = () => async (dispatch) => {
    try {
        dispatch({ type: GET_GALLERY_LIST });
        const { data } = await API.get(`/getGallery`);
        dispatch({ type: SUCCESS_GALLERY_LIST, payload: data });
    } catch (error) {
        console.log(error, "error")
        dispatch({
            type: FAILURE_GALLERY_LIST
        });
        toast.error(error?.message)
    }
};

//Update Gallery 
export const updateGalleryImage = (details) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_GALLERY_IMAGE_REQUEST })
        const { data } = await API.put(`/edit-gallery-image`, details)
        if (data.status_code == 200) {
            dispatch({ type: EDIT_GALLERY_IMAGE_SUCCESS, payload: data })
            toast.success(data?.message)
            setTimeout(() => { window.location.href = `/property-list/University/${data?.gallery.property_id}/gallery`; }, 1000)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: EDIT_GALLERY_IMAGE_FAILURE
        });
        toast.error(error?.message)
    }
};

//Delete Gallery
export const deleteGalleryImg = (details) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_GALLERY_IMAGE_REQUEST });
        const { data } = await API.put(`/delete-gallery-image`, details)
        if (data.status_code == 200) {
            dispatch({ type: DELETE_GALLERY_IMAGE_SUCCESS, payload: data })
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: DELETE_GALLERY_IMAGE_FAILURE
        });
        toast.error(error?.message)
    }
}

// Replace Gallery
export const replaceGalleryImage = (details) => async (dispatch) => {
    try {
        dispatch({ type: REPLACE_GALLERY_IMAGE_REQUEST })
        const { data } = await API.put(`/replace-gallery-image`, details)
        if (data.status_code == 200) {
            dispatch({ type: REPLACE_GALLERY_IMAGE_SUCCESS, payload: data })
            toast.success(data?.message)
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: REPLACE_GALLERY_IMAGE_FAILURE
        });
        toast.error(error?.message)
    }
}

//Get FAQ
export const getFaqs = () => async (dispatch) => {
    try {
        dispatch({ type: GET_FAQS_LIST });
        const { data } = await API.get(`/getFaqs`);
        console.log(data, "getGallery")

        dispatch({ type: SUCCESS_FAQS_LIST, payload: data });

    } catch (error) {
        console.log(error, "error")
        dispatch({
            type: FAILURE_FAQS_LIST
        });
        toast.error(error?.message)
    }
};

//Add review action
export const createReview = (review) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_ADD_REQUEST })
        const { data } = await API.post('/createReview', review);
        if (data.status_code == 200) {
            dispatch({ type: REVIEW_ADD_SUCCESS, payload: data?.property });
            toast.success(data?.message)
            return data;
        } else {
            toast.error(data?.message)
        }
    } catch (error) {
        dispatch({
            type: REVIEW_ADD_FAILURE
        });
        toast.error(error?.message)
    }
};

//fetch Review
export const fetchReview = () => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_LIST });
        const { data } = await API.get(`/getReviews`);
        dispatch({ type: SUCCESS_REVIEWS_LIST, payload: data });
    } catch (error) {
        console.log(error, "error")
        dispatch({
            type: FAILURE_REVIEWS_LIST
        });
        toast.error(error?.message)
    }
};

//delete review
export const reviewDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_DELETE_REQUEST });
        const { data } = await API.delete(`/deleteReview?id=${id}`);
        toast.success("Review deleted successfully.");
        dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAILURE,
        });
    }
};

export const reviewUpdate = (user) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_UPDATE_REQUEST });
        const { data } = await API.put(`/reveiwUpdate`, user);
        dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: data });
        toast.success("Property updated successfully.")
        return data;
    } catch (error) {
        toast.error(error)
        dispatch({
            type: REVIEW_UPDATE_FAILURE,
            // payload: error.message && error.message ? error.message : '',
        });
    }
};