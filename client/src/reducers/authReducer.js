import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    googleUserId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, googleUserId: action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn: false, googleUserId: null}
        default:
            return state;
    }
};