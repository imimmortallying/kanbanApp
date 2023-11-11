import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Modal.module.scss"
import React, { ReactNode, lazy, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpened?: boolean; // почему я должен получат это пропсом?
    onClose?: () => void; // закрывает окно. Почему я должен получать это пропсом?
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {

    const {
        className,
        children,
        isOpened,
        onClose,
    } = props;

    const {theme} = useTheme();

    const [isClosing, setIsClosing] = useState(false); // этот стейт нужен для того, чтобы создать анимацию закрытия

    // модальное окно монтируется в дом только после первого открытия при помощи флага lazy, получаемеого в props:
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        if (isOpened) {
            setIsMounted(true)
        }
    }, [isOpened])


    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const ANIMATION_DELAY = 200;

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpened,
        [cls.isClosing]: isClosing,
    } // моды передадутся в classNames {}




    // получив isOpened пропосом, можно проверить, тру или фолс, и если тру, то при нажатии на окно закрыть его
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY)
        }
    }, [onClose]);

    const authData = useSelector(getUserAuthData); // логика закрывания модального окна при логине, если при нажатии на "войти" пользователь найден
    useEffect( ()=> {
        if (authData) {
            closeHandler();
        }
    }, [authData])

    // при перерендеринге компонента создаются новые константы функций, новые ссылки. Чтобы избежать этого, использую useCallback (почему не useMemo?)
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        // в одном случае - React.MouseEvent, в другом, просто KeyboardEvent - TS совсем не понимаю
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler])

    //!15.46 - к вопросу о том, почему timeout помещен в реф. Что произойдет, если модальное окно по какой-то причине демонтируется из дерева? - таймер отработает
    // и мы попытаемся изменить состояние несуществующего компонента, что вызовет ошибку. Подобные асинхронные операции по-хорошему необходимо очищать. Для этого
    // используем useEffect - вернем из useEffect ф-ю, которая и будет проводить очистку

    useEffect(() => {
        if (isOpened) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpened, onKeyDown]) // зачем вторая зависимость? Рекомендуется настраивать ESLinter, чтобы он подсказывал в т.ч. то, где пропущены зависимости и т.д



    const onContentClick = (e: React.MouseEvent) => { // убираем реакцию на слушатель событий
        e.stopPropagation();
    }

    // монтаж модального окна при первом открытии
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={classNames(cls.content, {}, [className])} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>

    );
};

// варианты для модального окна - прозрачность 0, поинтер квентс ноне. При открытии - opacity 1, events: auto