import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const RESET = "RESET"

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(
      'https://reqres.in/api/login',
      credentials, 
      {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      }
    );
   
    const { token } = response.data;
    localStorage.setItem('token', token);

    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.error || 'Login failed',
    });
  }
};

export const reset =()=>{
  return (dispatch)=>{
    dispatch({type:RESET})
  }
}
