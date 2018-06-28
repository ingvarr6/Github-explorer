import { getTopics, getTopicOverview } from '../api/index';

export const TOPICS_REQUEST = 'TOPICS_REQUEST';
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS';

export const TOPIC_OVERVIEW_REQUEST = 'TOPICS_OVERVIEW_REQUEST';
export const TOPIC_OVERVIEW_SUCCESS = 'TOPICS_OVERVIEW_SUCCESS';

export function fetchTopics(params) {
  return dispatch => {
    dispatch({
      type: TOPICS_REQUEST
    });
    getTopics(params).then(data => {
      getTopics('nextPage').then(nextData => {
        dispatch({
          type: TOPICS_SUCCESS,
          payload: {
            topics: data.concat(nextData)
          }
        });
      });
    });
  };
}

export function fetchTopicsOverview(url) {
  return dispatch => {
    dispatch({
      type: TOPIC_OVERVIEW_REQUEST
    });
    getTopicOverview(url).then(data => {
      dispatch({
        type: TOPIC_OVERVIEW_SUCCESS,
        payload: {
          topicOverview: data
        }
      });
    });
  };
}
