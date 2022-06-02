import * as actionNames from '../action_names/global_names';

// Activity Actions
export const activityStarted = (activity: any, global = true) => ({
  type: actionNames.ACTIVITY_STARTED,
  payload: { activity: activity, global: global },
});
export const activityFinished = (activity: any, global = false) => ({
  type: actionNames.ACTIVITY_FINISHED,
  payload: { activity: activity, global: global },
});

// Error Actions
export const clearError = () => ({
  type: actionNames.CLEAR_ERROR,
});
export const setError = (message: string, title?: string) => ({
  type: actionNames.ERROR,
  payload: { title, message },
});
