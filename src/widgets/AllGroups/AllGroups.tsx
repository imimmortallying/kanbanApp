import React from "react";
import cls from "./AllGroups.module.scss";
import { Button } from "antd";
import { useAppDispatch } from "shared/lib/store/redux";
import { useTranslation } from "react-i18next";
import { addNewGroupRequest } from "entities/TodoGroup/todoGroupThunk";
import { addGroup } from "entities/TodoGroup/todoGroupSlice";
import { IUser } from "entities/User/model/slice/types";

interface AlGroupsProps {
  children?: React.ReactNode;
  authData: IUser['authData'];
}

export const AllGroups = ({ children, authData }: AlGroupsProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
  return (
    <div className={cls.AllGroups}>
      {children}
      <Button
          className={cls.newGroup_btn}
          onClick={() => {
            authData !== "guest"
              ? dispatch(
                  addNewGroupRequest({ username: authData.username })
                )
              : dispatch(addGroup(crypto.randomUUID()));
          }}
        >
          {t("Новая группа")}
        </Button>
    </div>
  );
};
