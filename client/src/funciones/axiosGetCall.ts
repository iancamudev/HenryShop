import axios from "axios"
import store from "../redux/store";
const back_url = process.env.REACT_APP_BACKEND_URL as string

// endpoint example:  "/users" "/users/usernameblabla"
export default function axiosGetCall(endpoint: string) {
  const { token } = store.getState().user;
  return axios.get(`${back_url}${endpoint}`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
}