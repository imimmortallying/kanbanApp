import { showAll, showOpened, showClosed, toggleFilter} from "features/filterReducer/visibilityFilterSlice"; //
import {  useDispatch, useSelector } from 'react-redux';
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FilterAccomplishmentBtns.module.scss"
import { Button } from "antd";

interface FilterAccomplishmentBtnsProps {
    className?: string;
}
export const FilterAccomplishmentBtns = ({className}:FilterAccomplishmentBtnsProps) => {

    const dispatch = useDispatch();

    //? как вынести из компонента селектор? и нужно ли

    const acomplishment = useSelector((state:any) => state.visibilityFilter.acomplishment)
    return (
        <div className={classNames(cls.FilterAccomplishmentBtns, {}, [className])}>
                    <Button type={acomplishment === 'all' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showAll()) }}>Все</Button>
                    <Button type={acomplishment === 'opened' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showOpened()) }}>Текущие</Button>
                    <Button type={acomplishment === 'closed' ? 'primary' : 'default'} className="header__filter" onClick={() => { dispatch(showClosed()) }}>Выполненные</Button>
        </div>
    );
};