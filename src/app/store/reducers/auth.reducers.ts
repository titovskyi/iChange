import { AuthActions, AuthActionTypes } from '~/app/store/actions/auth.actions';
import { AuthStateInterface, initialAuthState } from '~/app/store/state/auth.state';

export const authReducers = (state = initialAuthState, action: AuthActions): AuthStateInterface => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            console.log('here')
            return {
                ...state,
                confirmCode: action.payload.code,
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        case AuthActionTypes.CONFIRM_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                errorMessage: null
            };
        }
        case AuthActionTypes.CONFIRM_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
