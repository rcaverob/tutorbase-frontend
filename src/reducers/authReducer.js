import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  authError: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, authError: false };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, authError: false };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, authError: true };
    default:
      return state;
  }
};

export default AuthReducer;
