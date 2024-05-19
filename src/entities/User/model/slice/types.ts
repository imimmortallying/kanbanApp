import { ITodo } from "entities/Todo/model/types";
import { IGroup } from "entities/TodoGroup/types";

interface IUserData {
  todos: ITodo[];
  groups: IGroup[];
}
export type IUserAuthData = {
  username: string;
  password: string;
  data: IUserData;
};
export interface IUser {
  authData: IUserAuthData | "guest";
}
