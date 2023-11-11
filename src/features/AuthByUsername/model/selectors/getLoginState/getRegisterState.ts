// import { StateSchema } from 'app/providers/StoreProvider';

// export const getLoginState = (state: StateSchema) => state?.loginForm; // Улби получает то, что определено схемой. T.е login form это поле интерфейса
// StateSchema
// т.к. я пока не натягиваю ТС на свой проект, то как мне получить 2 поля, которые создаются в loginSlice?
// т.е мне нужно получить 2 переменные, которые меняют свое значение в зависимости от состояния запроса на сервер

export const getRegisterState = (state: any) => state?.registration;
