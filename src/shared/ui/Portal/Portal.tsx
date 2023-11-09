import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement; 
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        element = document.body, // стандартное место для вставки элемента, если не указано иное
    } = props;

    return createPortal (children, element);
};