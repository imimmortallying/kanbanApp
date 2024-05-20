import cls from "./RemoveItemsButton.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import TrashIcon from "shared/assets/icons/TrashIcon.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { IUser } from "entities/User/model/slice/types";

type ReduxAction = { payload: string; type: string };
type LocalAction = ReduxAction | ReduxAction[];
interface RemoveItemsButtonProps {
  authData: IUser["authData"];
  asyncAction: (...args: unknown[]) => void;
  localAction: LocalAction;
  className?: string;
}

export const RemoveItemsButton = ({
  authData,
  localAction,
  asyncAction,
  className,
}: RemoveItemsButtonProps) => {
  const dispatch = useAppDispatch();

  function dispatchArrOfFunctions(functions: LocalAction) {
    if (Array.isArray(functions)) {
      for (const func of functions) {
        dispatch(func);
      }
    } else dispatch(functions);
  }

  return (
    <button
      onClick={() => {
        authData === "guest"
          ? dispatchArrOfFunctions(localAction)
          : dispatch(asyncAction);
      }}
      className={classNames(cls.Button_remove_task, {}, [className])}
    >
      {<TrashIcon className={cls.remove_icon} />}
    </button>
  );
};
