import { getTrends } from '../api/index';
import { AsyncStorage } from 'react-native';

export const TRENDS_REQUEST = 'TRENDS_REQUEST';
export const TRENDS_SUCCESS = 'TRENDS_SUCCESS';
export const TRENDS_FAILURE = 'TRENDS_FAILURE';

export const TREND_TO_BOOKMARK = 'TREND_TO_BOOKMARK';

export function fetchTrends(params) {
  return dispatch => {
    dispatch({
      type: TRENDS_REQUEST
    });

    getTrends(params).then(data => {
      const updatedData = data.map(trend => {
        return Object.assign({}, trend, { isBookmark: false });
      });

      const savedBookmars = getBookmarksFromAsyncStorage();
      savedBookmars.then(bookmark => {
        updatedData.map(trend => {
          if (bookmark === null) {
            return;
          }
          return bookmark.map(savedTrend => {
            if (trend.name === savedTrend.name) {
              trend.isBookmark = true;
            }
          });
        });
        dispatch({
          type: TRENDS_SUCCESS,
          payload: {
            trends: updatedData
          }
        });
      });
    });
  };
}

export function toBookmark(obj) {
  return dispatch => {
    dispatch({
      type: TREND_TO_BOOKMARK,
      payload: obj
    });
  };
}

const getBookmarksFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@githubexplorer:bookmarks');
    return JSON.parse(value);
  } catch (error) {
    console.log('Error retrieving data' + error);
  }
};
