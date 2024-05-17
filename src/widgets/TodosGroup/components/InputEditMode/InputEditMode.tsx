import { classNames } from "shared/lib/classNames/classNames";

import cls from "./InputEditMode.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { changeGroupName } from "entities/TodoGroup/todoGroupSlice";
import { changeGroupNameRequest } from "entities/TodoGroup/todoGroupThunk";

interface InputEditModeProps {
  className?: string;
  inputValue: string;
  onChangeHandler: any;
  authData: any;
  inputEditModeSetter: any;
  groupId: string;
}

export const InputEditMode = ({
  className,
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
