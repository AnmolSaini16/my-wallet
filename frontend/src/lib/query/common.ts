import { ApiNamesEnum } from "@/constants/enum/api.enum";
import { patchData } from "../actions";

export const editUserInfo = async <T>(payload: T): Promise<Response> => {
  return patchData<T>(ApiNamesEnum.User, payload);
};
