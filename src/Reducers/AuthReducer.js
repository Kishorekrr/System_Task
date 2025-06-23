import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,RESET } from '../Actions/AuthAction';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET:
      return {...state,token:null}
    default:
      return state;
  }
};
