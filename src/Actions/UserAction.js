import axios from 'axios';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';


export const CREATE_USER = 'CREATE_USER_SUCCESS';
export const EDIT_USER = 'EDIT_USER_SUCCESS';
export const DELETE_USER= "DELETE_USER"
export const RESET = "RESET_POST"





export const getUsers = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
      const response = await axios.get(
        'https://reqres.in/api/users?paage=1',
        {
          headers: {
            'x-api-key': 'reqres-free-v1', 
            'Authorization': `Bearer ${token}`, 
          },
        }
      );

      dispatch({ type: GET_USER_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response?.data?.error || 'User fetch failed',
      });
    }
  };
};


export const CreateUser = (formdata)=>{
  return async (dispatch,getState)=>{
    const { user } = getState(); 

    
    const maxId = user.user_data.length
      ? Math.max(...user.user_data.map((u) => u.id))
      : 0;

    const formattedData = {
      id: maxId + 1,
      first_name: formdata.firstName,
      last_name: formdata.lastName,
      email: formdata.email,
      avatar: formdata.avatar,
    };
    
    dispatch({ type: CREATE_USER, payload: formattedData });   
  }
}


export const reset = () => (dispatch) => {
  dispatch({ type: RESET });
};

export const EditUser = (formdata, id) => {

  return async (dispatch) => {    
    const formattedData = {
      first_name: formdata.firstName,
      last_name: formdata.lastName,
      email: formdata.email,
      avatar: formdata.avatar,
    };
    
    dispatch({ type: EDIT_USER, payload: { id, updatedData: formattedData } });
    
  };
};


export const userDelete = (id)=>{
  return (dispatch)=>{
    dispatch({type:DELETE_USER, payload:id})
  }
}