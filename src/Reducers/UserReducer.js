import {
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS, 
  CREATE_USER, 
  EDIT_USER, 
  RESET,
  DELETE_USER
} from "../Actions/UserAction";

const initialState = {
  loading: false,
  user_data: [],
  error: null,
  create_loading:false,
  post_created:false,  
  post_id:0,
  isEdited:false,
  isModified:false,
  isDeleted:false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, user_data: action.payload };

    case GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
  

      case CREATE_USER:
        return {
          ...state,
          post_created: true,
          isModified: true,
          user_data: [...state.user_data, action.payload],  
        };   
      
    case EDIT_USER:
         const updatedUsers = state.user_data.map((user) =>
         user.id == action.payload.id
         ? { ...user, ...action.payload.updatedData } 
         : user
         );

       return {
          ...state,
          loading: false,
          isEdited: true,
          user_data: updatedUsers,
          isModified:true
       };

       case DELETE_USER:
        const updatedUsers2 = state.user_data.filter(user => user.id !== action.payload);
        return {
          ...state,
          user_data: updatedUsers2,
          isDeleted: true
        };

    case RESET:
        return { ...state, create_loading: false, post_error:false, post_created:false,isEdited:false };
  
    default:
      return state;
  }
};
