import streams from '../apis/streams';
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "./types";

export const signIn = (googleUserId) => {
    return {
        type: SIGN_IN,
        payload: googleUserId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues, history) => async (dispatch, getState) => {
    const { googleUserId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, googleUserId });
    dispatch({ type: CREATE_STREAM, payload: response.data })
    history.push('/')
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data })
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    console.log(response.data)
    dispatch({ type: FETCH_STREAM, payload: response.data })
};

export const editStream = (id, formValues, history) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data })
    history.push('/')
};

export const deleteStream = (id, history) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id })
    history.push('/')
};