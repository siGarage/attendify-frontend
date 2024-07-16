import { EXAMS_ADD_SUCCESS, EXAM_UPDATE_SUCCESS,EXAM_GET_SUCCESS, EXAM_DELETE_SUCCESS, CATEGORY_GET_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../Constants/Constants';

let initState = {
    exams: [],
}

const examReducer = (state = initState, action) => {
    switch (action.type) {
        case EXAMS_ADD_SUCCESS:
            return ({
                ...state,
                exams: [...state.exams, action.payload]
            });
        case EXAM_GET_SUCCESS:
            return ({
                ...state,
                exams: action.payload
            });
        case EXAM_DELETE_SUCCESS:
            return ({
                ...state,
                exams: state?.exams.filter(item => item?._id !== action.payload.id)
            });
        case EXAM_UPDATE_SUCCESS:
            return ({
                ...state,
                exams: state.exams.map((item) =>
                    item?._id == action.payload?._id ? { ...action.payload } : item
                )
            });
        default:
            return state;
    }
};
export default examReducer;
