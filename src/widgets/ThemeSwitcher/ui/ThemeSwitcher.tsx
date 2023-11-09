import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { Button } from "antd";

import Sun from "shared/assets/icons/sun.svg";
import Moon from "shared/assets/icons/moon.svg";
import { Theme } from "app/providers/ThemeProvider/ThemeContext";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {

    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={classNames(cls.ThemeSwitcher, { [cls.active]: theme === Theme.DARK })}
            onClick={toggleTheme}
        >
            {
                <>
                    <Sun className={classNames(cls.Sun, {}, [theme])} />
                    <Moon className={classNames(cls.Moon, {}, [theme])} />
                </>
            }

        </button>
    );
};