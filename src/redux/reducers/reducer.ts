const initialState = {
  auth: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.payload,
      };
    case 'REGISTER':
      return {
        ...state,
        auth: action.payload,
      };
    case 'USERS_BY_GROUP':
      return {
        ...state,
        byGroup: action.payload,
      };
    case 'GROUP':
      return {
        ...state,
        group: action.payload,
      };
    case 'GETGROUP':
      return {
        ...state,
        group: action.payload,
      };
    case 'JOINGROUP':
      return {
        ...state,
        joinGroup: action.payload,
      };
    case 'LOGOUT':
      return {
        auth: null,
      };
    default:
      return state;
  }
};
