import * as actions from '../actions/trendsAction';
import { AsyncStorage } from 'react-native';

const initialState = {
  trends: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TRENDS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actions.TRENDS_SUCCESS:
      return {
        ...state,
        trends: action.payload.trends,
        isLoading: false
      };
    case actions.TREND_TO_BOOKMARK:
      const updateTrends = state.trends.map((trend, index) => {
        if (trend.href === action.payload.href) {
          trend.isBookmark = !trend.isBookmark;
        }
        return trend;
      });

      const bookmarkTrend = updateTrends.filter(trend => {
        if (trend.isBookmark === true) {
          return trend;
        }
      });

      saveBookmarksToAsyncStorage(bookmarkTrend);

      return {
        ...state,
        trends: updateTrends
      };
    default:
      return state;
  }
};

const saveBookmarksToAsyncStorage = async value => {
  try {
    await AsyncStorage.setItem(
      '@githubexplorer:bookmarks',
      JSON.stringify(value)
    );
  } catch (error) {
    console.log('Error saving data' + error);
  }
};
