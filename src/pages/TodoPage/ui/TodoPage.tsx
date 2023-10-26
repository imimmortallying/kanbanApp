import { classNames } from "shared/lib/classNames/classNames";

import cls from "./TodoPage.module.scss"
import { useLocation } from "react-router-dom";
import { Checkbox, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoById, toggle, changeDesctiption, changeImportance } from "features/todosReducer/todosSlice";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { importanceInitial } from "entities/importanceFilterInitial/ImportanceFilterInitial";


interface TodoPageProps {
    className?: string;
}
export const TodoPage = ({ className }: TodoPageProps) => {
    const location = useLocation();
    const id = location.state;

    const dispatch = useDispatch();
    const todo = useSelector(state => selectTodoById(state, id))
    const { text, completed, importance, description } = todo;

    // не работает useRef с antd Input
    // const inputRef = useRef(null);

    const { TextArea } = Input;
    // useState для input
    const [inputText, setInputText] = useState(description);
    const handleInputChange = (e: any) => {
        setInputText(e.target.value)
    }




    return (
        <div className={classNames(cls.TodoPage, {}, [])}>
            <div className={classNames(cls.Header, {}, [])}>
                <div className="task-name">{`Задача: ${text}`}</div>
                <div className="back-button">
                    <Link to={'/'}>Назад</Link>
                </div>
            </div>

            <div className={classNames(cls.body, {}, [])}>
                <div className="task-name">Подробное описание задачи:</div>
                <div className="task-description">
                    <TextArea
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Что нужно сделать? Опиши подробнее..."
                        value={inputText}
                    >
                    </TextArea>
                    <Button type="dashed" onClick={() => { dispatch(changeDesctiption({ id, inputText })) }}> сохранить описание</Button>
                </div>
            </div>

            <div className={classNames(cls.footer, {}, [])}>
                <div className={classNames(cls.acomplish_block, {}, [])}>
                    <div>задача выполнена?</div>
                    <Checkbox
                        onChange={() => dispatch(toggle(id))}
                        checked={completed}
                    >
                    </Checkbox>
                </div>

                <div className={classNames(cls.importance_block, {}, [])}>
                    <div className="">Статус задачи</div>
                    <Select
                        size="small"
                        options={[...importanceInitial, { value: 'not chosen', label: 'Не выбран' }]}
                        style={{ width: 180 }}
                        onChange={(value) => dispatch(changeImportance({ id, value }))}
                        value={importance === 'not chosen' ? 'Выбери статус' : importance}
                    />
                </div>

            </div>
        </div>
    );
};