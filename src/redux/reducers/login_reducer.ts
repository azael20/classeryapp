import * as actionNames from '../action_names/login_names';

export const loginReducer = (
  state = { isLoggedIn: false, token: '', name: '' },
  action: any,
) => {
  switch (action.type) {
    case actionNames.LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        name: action.payload.name,
        email: action.payload.email,
      };
    case actionNames.LOGOUT:
      // clear out the state
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        user: {},
      };
    case actionNames.REGISTER_SUCCESSFUL:
      return {
        ...state,
        user: action.payload.user,
      };
    case actionNames.STORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
