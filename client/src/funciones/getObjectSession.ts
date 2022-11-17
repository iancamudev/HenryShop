import { IUserState } from "../redux/slices/UserSlice";

const getObjectSession = (): IUserState | null => {
  const json: string | null = localStorage.getItem("userSession");
  const ret = json ?  JSON.parse(json) as IUserState : null;
  return ret;
}

export default getObjectSession;