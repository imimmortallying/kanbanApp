import { showAll, showOpened, showClosed, toggleFilter } from "features/filterReducer/visibilityFilterSlice"; //
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FilterAccomplishmentBtns.module.scss"
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { selectAcomplishment } from "../model/selectors";
import { useAppSelector } from "shared/lib/store/redux";

interface FilterAccomplishmentBtnsProps {
    className?: string;
}
export const FilterAccomplishmentBtns = ({ className }: FilterAccomplishmentBtnsProps) => {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const acomplishment = useAppSelector(selectAcomplishment)
    return (
        <div className={classNames(cls.FilterAccomplishmentBtns, {}, [className])}>
            <div className={classNames(cls.text, {}, [])}>
            {t('Фильтрация задач по выполнению')}
            </div>
            <Button type={acomplishment === 'all' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showAll()) }}>
            {t('Все')}
            </Button>
            <Button type={acomplishment === 'opened' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showOpened()) }}>
            {t('Текущие')}
            </Button>
            <Button type={acomplishment === 'closed' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showClosed()) }}>
            {t('Выполненные')}
            </Button>
        </div>
    );
};