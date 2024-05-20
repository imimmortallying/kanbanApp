import cls from "./InputEditMode.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { changeGroupName } from "entities/TodoGroup/todoGroupSlice";
import { changeGroupNameRequest } from "entities/TodoGroup/todoGroupThunk";
import { IGroup } from "entities/TodoGroup/types";
import { IUser } from "entities/User/model/slice/types";

interface InputEditModeProps {
  className?: string;
  inputValue: IGroup["name"];
  onChangeHandler: (...arg:unknown[]) => void;
  authData: IUser["authData"];
  inputEditModeSetter: (arg: boolean) => void;
  groupId: string;
}

export const InputEditMode = ({
  authData,
  inputEditModeSetter,
  inputValue,
  groupId,
  onChangeHandler,
}: InputEditModeProps) => {
  const dispatch = useAppDispatch();
  return (
    <input
      className={cls.input_editMode}
      value={inputValue}
      autoFocus
      onChange={onChangeHandler}
      onBlur={() => {
        authData === "guest"
          ? dispatch(changeGroupName({ groupId, inputValue }))
          : dispatch(
              changeGroupNameRequest({
                username: authData.username,
                groupId,
                newName: inputValue,
              })
            );
        inputEditModeSetter(false);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        authData === "guest"
          ? dispatch(changeGroupName({ groupId, inputValue }))
          : dispatch(
              changeGroupNameRequest({
                username: authData.username,
                groupId,
                newName: inputValue,
              })
            );
        inputEditModeSetter(false);
      }}
    />
  );
};
