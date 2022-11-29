import axiosGetCall from "../../../funciones/axiosGetCall";
import { AppDispatch } from "../../store";
import { IUserState, setData, clearData } from "./index";

export const setUserData = () => (dispatch: AppDispatch) => {
  const session = JSON.parse(window.localStorage.getItem("userSession") as string);
  if(session?.hasOwnProperty("origin")){
    if(session.origin === 'default'){
      axiosGetCall("/users/getUserByToken").then((response) =>{
        dispatch(setData(response.data));
      }
      );
    }else if(session.origin === 'google'){
      axiosGetCall("/googleusers/getGoogleUserByToken").then((response) =>{
        dispatch(setData({username: response.data.name.split(' ')[0], confirmed:response.data.confirmed, token: '' }));
      }
      );
    }else if(session.origin === 'github'){
      axiosGetCall("/githubusers/getGithubUserByToken").then((response) =>{
        console.log(response.data);
        dispatch(setData({username: response.data.username, confirmed:response.data.confirmed, token: '' }));
      }
      );
    }
  }
  
};

export const clearUserData = () => (dispatch: AppDispatch) => {
  dispatch(clearData());
};
