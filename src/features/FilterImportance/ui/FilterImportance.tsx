import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FilterImportance.module.scss"
import { useDispatch } from "react-redux";
import { Checkbox } from "antd";
import { toggleFilter } from "features/filterReducer/visibilityFilterSlice";
import { importanceInitial } from "entities/importanceFilterInitial/ImportanceFilterInitial";

interface FilterImportanceProps {
    className?: string;
}
export const FilterImportance = ({className}:FilterImportanceProps) => {

    const dispatch = useDispatch();

    const renderedCheckboxes = importanceInitial.map(el => {
        return  <div className={cls.importance__elem} key={el.value}>
                    <Checkbox onChange={()=>( dispatch(toggleFilter(el.value)) )}/>
                    <div>{el.label}</div>
                </div>                  
    })

    return (
        <div className={classNames(cls.FilterImportance, {}, [className])}>
                                <span>Фильтрация по важности</span>
                                {renderedCheckboxes}                     
        </div>
    );
};