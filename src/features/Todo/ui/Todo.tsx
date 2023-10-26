import { classNames } from "shared/lib/classNames/classNames";
import { Button, Checkbox, Select } from 'antd';
import { FC, useRef, useEffect } from 'react'
import cls from "./Todo.module.scss"
import { ReactNode } from "react";
import { CheckboxProps } from "antd/es/checkbox/Checkbox";

//
import { useDispatch, useSelector } from 'react-redux';
import { remove, selectTodoById, toggle, changeImportance } from "features/todosReducer/todosSlice";
import { importanceInitial } from "entities/importanceFilterInitial/ImportanceFilterInitial";
import { Link } from "react-router-dom";


interface TaskProps extends Pick<CheckboxProps, 'onChange' | 'onClick'> {
    id: string
}

export const Todo: FC<TaskProps> = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const todo = useSelector(state => selectTodoById(state, id))
    const { text, completed, importance, description } = todo;

    function LogLog() { console.log('LogLog') }

    //!DND fight
    const refButton = useRef(null);

    useEffect(() => {
        const LogLog2 = (event: any) => {
            console.log('LogLog2')
        }
        const buttonElement = refButton.current;
        buttonElement.addEventListener('click', LogLog2)


        return () => {
            buttonElement.removeEventListener('click', LogLog2);
        };

    }, [])


    let draggingEle: any;
    let x = 0;
    let y = 0;
    const mouseDownHandler = function (e: any) {

        // e.stopImmediatePropagation();
        // e.target.removeEventListener('click', LogLog)
        draggingEle = e.target.closest('.' + cls.Task);

        // Calculate the mouse position
        const rect = draggingEle.getBoundingClientRect();
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;
        console.log(draggingEle)
        // console.log(cls.Task)

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler); //! use effect to remove eventListener
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e: any) {
        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${e.pageY - y}px`;
        draggingEle.style.left = `${e.pageX - x}px`;

    };

    const mouseUpHandler = function () {
        // Remove the position styles
        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        x = null;
        y = null;
        draggingEle = null;

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    //! DND end
    return (

        <div className={classNames(cls.Task, {}, [])} onMouseDown={(e) => mouseDownHandler(e)}>

            <Checkbox
                onChange={() => dispatch(toggle(id))}
                checked={completed}
            >
            </Checkbox>

            {/* в линк передать Index todo. Этот же индекс будет передан в App <route path= index />*/}
            <Link
                state={id}
                to={'/todo'}
                className={classNames(cls.Text, {}, [])}
            >
                {text}
            </Link>

            <div className={classNames(cls.description, {}, [])}>{description}</div>

            <Select
                size="small"
                options={[...importanceInitial, { value: 'not chosen', label: 'Не выбран' }]}
                style={{ width: 180 }}
                // placeholder="Выбери статус" // его не видно, приходится добавлять его как value, а это не серый, а черный цвет текста
                onChange={(value) => dispatch(changeImportance({ id, value }))}
                value={importance === 'not chosen' ? 'Выбери статус' : importance}
            />

            <button ref={refButton}>Click</button>
            <Button
                // onClick={() => dispatch(remove(id))}
                onClick={(e) => { console.log(e.target) }}


                className={classNames(cls.Button, {}, [])}
                type="link"
                danger
                size='small'

            >
                удалить
            </Button>
        </div>
    );
};

