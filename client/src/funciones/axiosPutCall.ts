import axios from "axios"
const back_url = process.env.REACT_APP_BACKEND_URL as string

// endpoint example:  "/users" "/users/usernameblabla"
export default function axiosPutCall(endpoint: string, payload: any) {
  const token = JSON.parse(window.localStorage.getItem('userSession') as string).token as string
  return axios.put(`${back_url}${endpoint}`, payload, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
}