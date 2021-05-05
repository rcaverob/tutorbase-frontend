import { ActionTypes } from '../actions';

const initialState = {
  tutors: [],
  tutees: [],
};


const MyPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MY_TUTEE_POSTS:
      return { tutors: state.tutors, tutees: action.payload };
    case ActionTypes.FETCH_MY_TUTOR_POSTS:
      return { tutors: action.payload, tutees: state.tutees };
    default:
      return state;
  }
};

export default MyPostsReducer;
