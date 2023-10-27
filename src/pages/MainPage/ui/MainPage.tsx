import { classNames } from "shared/lib/classNames/classNames";
import { FC, ReactNode, useState, useRef, useEffect, useId } from 'react';
import cls from "./MainPage.module.scss"
import { Button, Checkbox, ConfigProvider } from 'antd';


//redux toolkit
import { TodoList } from "widgets/TodoList";
import { FilterAccomplishmentBtns } from "features/FilterAcomplishmentBtns";
import { FilterImportance } from "features/FilterImportance";
import { AddTodo } from "features/AddTodo";
import { FindTodo } from "features/FindTodo";
import { TodoGroups } from "widgets/TodoGroups/TodoGroups";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";


//
interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = (props) => {

    const { className, children } = props
    const {theme} = useTheme();
    console.log(getComputedStyle(document.documentElement).getPropertyValue('--third-color'))
    console.log(theme)
    return (
        <ConfigProvider
        theme={{
            token: {
                colorPrimary:'#FAAD14', 
                // colorPrimary: theme === 'dark'? '#FAAD14' : '#74fa14', 
                // а если тем будет 10? если нужно еще и передавать будет целый набор цветов одной темы. Либо с 0 делать самому компоненты
                // либо научиться полуать динамически переменные из css (см ниже), либо научиться взаимодействовать с antd внутри css 
                // colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--third-color'),
                //! достать переменную темы не получается. Можно задать ее дополнительно в global.scss, тогда увиже ее выше. Но она будет статичная
                //! как правильно задать в этом случае темы, не переписывая структуру темы вручную?
                //? один из вариантов смотри в index.scss
                fontFamily: 'Consolas, "Times New Roman", Serif',
                fontSize: 16,
            },
        }}
    >

        <div className={classNames(cls.MainPage, {}, [className])}>

            <div className={classNames(cls.Header, {}, [className])}>
                <FindTodo></FindTodo>
                <FilterAccomplishmentBtns></FilterAccomplishmentBtns>
                <FilterImportance></FilterImportance>
                <div className={classNames(cls.contextButtons, {}, [className])}>
                    <ThemeSwitcher></ThemeSwitcher>
                    deploy
                    <LangSwitcher></LangSwitcher>
                </div>

            </div>
            <TodoGroups></TodoGroups>
        </div>
        </ConfigProvider>

    );
};
