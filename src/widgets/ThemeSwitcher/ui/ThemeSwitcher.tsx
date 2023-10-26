import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ThemeSwitcher.module.scss"
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { Button } from "antd";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({className}:ThemeSwitcherProps) => {

    const { theme, toggleTheme } = useTheme();

    return (
        <Button 
        className={classNames(cls.ThemeSwitcher, {}, [className])}
        onClick={toggleTheme}
        >
            Toggle Theme
        </Button>
    );
};