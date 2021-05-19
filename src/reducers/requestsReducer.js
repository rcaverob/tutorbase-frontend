import { ActionTypes } from '../actions';

const initialState = {
  incomingRequests: [],
  myRequests: [],
  requestedPostIDs: [],
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DEAUTH_USER:
      return {
        incomingRequests: [],
        myRequests: [],
        requestedPostIDs: [],
      };
    case ActionTypes.FETCH_REQUESTS:
      return {
        incomingRequests: action.payload,
        myRequests: state.myRequests,
        requestedPostIDs: state.requestedPostIDs,
      };
    case ActionTypes.FETCH_MY_REQUESTS:
      return {
        incomingRequests: state.incomingRequests,
        myRequests: action.payload,
        requestedPostIDs: action.payload.map((req) => req.postID.id),
      };
    case ActionTypes.FETCH_MY_REQUESTED_POST_IDS:
      return {
        incomingRequests: state.incomingRequests,
        myRequests: state.myRequests,
        requestedPostIDs: action.payload,
      };
    default:
      return state;
  }
};

export default requestsReducer;
