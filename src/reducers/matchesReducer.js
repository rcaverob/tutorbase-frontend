import { ActionTypes } from '../actions';

const initialState = {
  requests: [],
  allMatches: [],
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionTypes.FETCH_POST:
    //   return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_REQUESTS:
      return { requests: action.payload, allMatches: state.allMatches };
    case ActionTypes.FETCH_MATCHES:
      return { requests: state.requests, allMatches: action.payload };
    default:
      return state;
  }
};

export default matchesReducer;
