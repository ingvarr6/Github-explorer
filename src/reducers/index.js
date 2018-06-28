import { combineReducers } from 'redux';

import { nav } from './navigation';
import trends from './trends';
import topics from './topics';

const AppReducer = combineReducers({
  nav,
  trends,
  topics
});

export default AppReducer;
