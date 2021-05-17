import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  authError: false,
  currentUser: null,
};

const AuthReducer = (state = initialState, action) => {
  const user = action.payload;
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, authError: false, currentUser: user };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, authError: false, currentUser: null };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, authError: true, currentUser: null };
    default:
      return state;
  }
};

export default AuthReducer;
