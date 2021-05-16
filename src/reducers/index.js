import { combineReducers } from 'redux';

import PostReducer from './postReducer';
import AuthReducer from './authReducer';
import MyPostsReducer from './myPostsReducer';
import matchesReducer from './matchesReducer';
import requestsReducer from './requestsReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  myPosts: MyPostsReducer,
  matches: matchesReducer,
  requests: requestsReducer,
});

export default rootReducer;
