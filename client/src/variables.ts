import store from "./redux/store"

export const back_url = process.env.REACT_APP_BACKEND_URL as string

const token = store.getState().user.token;
// instead of this, use an axios func
export const authHeader = {
  headers:{
    "Authorization": `bearer ${token}`
  }
}