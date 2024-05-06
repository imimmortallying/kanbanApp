
import { FC, ReactNode, useState, useEffect, useCallback } from "react";
import cls from "./MainPage.module.scss";
import { ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { defaultTodosState } from "features/todosReducer/todosSlice";
import { InitReduxByToken } from "features/AuthByUsername/model/services/InitReduxByToken";
import { defaultGroupsState } from "features/groupsReducer/groupsSlice";

import { TodoGroups } from "widgets/TodoGroups/TodoGroups";

import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { userActions } from "entities/User/model/slice/userSlice";
import { Header } from "widgets/Header/Header";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";

interface MainPageProps {
  className?: string;
  children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  const authData = useAppSelector(selectUserAuthData); // добавить public api - index.ts

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (authData) {
      if (authData === "guest") {
        dispatch(defaultGroupsState());
        dispatch(defaultTodosState());
      } else {
        dispatchAsync(
          InitReduxByToken({
            username: authData.username,
            password: authData.password,
          })
        );
      }
    }
  }, [authData]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FAAD14",
          fontFamily: 'Consolas, "Times New Roman", Serif',
          fontSize: 16,
        },
      }}
    >
      <div className={cls.MainPage}>
        <Header></Header>
        <TodoGroups></TodoGroups>
      </div>
    </ConfigProvider>
  );
};
