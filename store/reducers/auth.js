import * as actions from "../actions/auth";

const initialState = {
    token: null,
    userId: null
};

const authReducer = (state = initialState, action) => {
    const { token, userId } = action;

    switch (action.type) {
        case actions.AUTHENTICATE:
            return { token, userId };

        case actions.SIGN_OUT:
            return initialState;

        default:
            return state;
    }
};

export default authReducer;
