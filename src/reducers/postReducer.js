import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DEAUTH_USER:
      return {
        all: [],
        current: {},
      };
    case ActionTypes.FETCH_POST:
      return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload, current: state.current };
    default:
      return state;
  }
};

export default PostReducer;
