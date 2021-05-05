import { combineReducers } from 'redux';

import PostReducer from './postReducer';
import AuthReducer from './authReducer';
import MyPostsReducer from './myPostsReducer';
import matchesReducer from './matchesReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  myPosts: MyPostsReducer,
  matches: matchesReducer,
});

export default rootReducer;
