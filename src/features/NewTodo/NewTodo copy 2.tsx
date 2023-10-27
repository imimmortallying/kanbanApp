import { classNames } from "shared/lib/classNames/classNames";

import cls from "./NewTodo.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { changeImportance, changeTodoText, remove, selectTodoById, toggle, swapTodos } from "features/todosReducer/todosSlice";
import { Button, Checkbox, Select, Input, ConfigProvider } from "antd";
import { importanceInitial } from "entities/importanceFilterInitial/ImportanceFilterInitial";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

import CrossIcon from "shared/assets/icons/cross.svg";




import { CSS } from "@dnd-kit/utilities"

interface NewTodoProps {
    className?: string;
    id: string;
}



export const NewTodo = ({ className, id }: NewTodoProps) => {



    const dispatch = useDispatch();
    const todo = useSelector(state => selectTodoById(state, id))
    const { text, completed, importance, description, group } = todo;

    // show options on textfield hover
    const [mouseIsOver, setMouseIsOver] = useState(false);

    // textfield
    const { TextArea } = Input;
    const [textareaValue, setTextareaValue] = useState(text);
    const handleInputChange = (e: any) => {
        setTextareaValue(e.target.value)
    }

    const [inputEditMode, setInputEditMode] = useState(false);

    //dnd todo
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: id,
        data: {
            type: 'Todo',
            todo,
        },
        disabled: inputEditMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    // тот, который рисуется под перетаскиваемым
    if (isDragging) {
        return <div
            className={classNames(cls.Todo_dragging, {}, [])}
            ref={setNodeRef}
            style={style}
        >

        </div>
    }
    // сильно сложно и повторяется один и тот же код, меняется лишь несколько css свойств, как лучше переделать?

    if (inputEditMode) {
        return (

                <div
                    //dnd todo
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    id={id}
                    className={classNames(cls.NewTodo_active, {}, [className])}
                    onClick={() => setInputEditMode(true)}
                    onMouseEnter={() => {
                        setMouseIsOver(true);
                    }}
                    onMouseLeave={() => {
                        setMouseIsOver(false);
                    }}
                >

                    <textarea
                        value={textareaValue}
                        autoFocus
                        className={classNames(cls.todo_textArea_active, {}, [])}
                        onChange={handleInputChange}
                        onBlur={() => {
                            dispatch(changeTodoText({ id, textareaValue })),
                                setInputEditMode(false)
                        }
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey) {
                                setInputEditMode(false)
                                dispatch(changeTodoText({ id, textareaValue }))
                                setMouseIsOver(false)
                            }
                        }}
                        placeholder="Что нужно сделать?"

                    >

                    </textarea>

                </div>

        )
    }

    if (!inputEditMode && mouseIsOver) {
        return (

                <div
                    //dnd todo
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}

                    id={id}
                    className={classNames(cls.NewTodo, {}, [className])}

                    onMouseEnter={() => {
                        setMouseIsOver(true);
                    }}
                    onMouseLeave={() => {
                        setMouseIsOver(false);
                    }}
                >
                    <div className={classNames(cls.todo_options, {}, [])}>
                        <Checkbox
                            onChange={() => dispatch(toggle(id))}
                            checked={completed}
                            className={classNames(cls.checkbox, {}, [])}
                        />
                        <Select
                            className={classNames(cls.select, {}, [])}
                            size="small"
                            options={[...importanceInitial, { value: 'not chosen', label: 'Не выбран' }]}
                            style={{ width: 180 }}
                            // placeholder="Выбери статус" // его не видно, приходится добавлять его как value, а это не серый, а черный цвет текста
                            onChange={(value) => dispatch(changeImportance({ id, value }))}
                            value={importance === 'not chosen' ? 'Выбери статус' : importance}
                        />
                        <Button
                            onClick={() => dispatch(remove(id))}
                            className={classNames(cls.Button_remove_task, {}, [])}
                            type="link"
                            danger
                            size='small'
                        >
                            {<CrossIcon className={classNames(cls.cross, {}, [])} />}
                        </Button>
                    </div>

                    {/* разница в абзаце, вместо инпута, когда неактивный режим */}
                    <p
                        className={classNames(cls.todo_text, {}, [])}
                        onClick={() => setInputEditMode(true)}
                    >
                        {text}
                    </p>

                </div>

        );
    }

    if (!inputEditMode && !mouseIsOver) {
        return (


                <div
                    //dnd todo
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}

                    id={id}
                    className={classNames(cls.NewTodo, {}, [className])}
                    onClick={() => setInputEditMode(true)}
                    onMouseEnter={() => {
                        setMouseIsOver(true);
                    }}
                    onMouseLeave={() => {
                        setMouseIsOver(false);
                    }}
                >
                    <p className={classNames(cls.todo_text, {}, [])}>
                        {text}
                    </p>

                    <div className={classNames(cls.todo_options, {}, [])}>
                        <Checkbox
                            onChange={() => dispatch(toggle(id))}
                            checked={completed}
                            className={classNames(cls.checkbox, {}, [])}
                        />
                        <Select
                            className={classNames(cls.select, {}, [])}
                            size="small"
                            options={[...importanceInitial, { value: 'not chosen', label: 'Не выбран' }]}
                            style={{ width: 180 }}
                            // placeholder="Выбери статус" // его не видно, приходится добавлять его как value, а это не серый, а черный цвет текста
                            onChange={(value) => dispatch(changeImportance({ id, value }))}
                            value={importance === 'not chosen' ? 'Выбери статус' : importance}
                        />
                        <Button
                            onClick={() => dispatch(remove(id))}
                            className={classNames(cls.Button_remove_task, {}, [])}
                            type="link"
                            danger
                            size='small'
                        >
                            {<CrossIcon className={classNames(cls.cross, {}, [])} />}
                        </Button>
                    </div>

                </div>


        );
    }

};
