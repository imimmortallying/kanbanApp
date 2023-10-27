import { useTranslation } from "react-i18next";


export const ImportanceFilterInitial = () => {
    const { t } = useTranslation();

    const importanceInitial = [
        {value: 'U&I', label: t('Важно и срочно')},
        {value: '!U&I', label: t('Важно и не срочно')},
        {value: 'U&!I', label: t('Срочно и не важно')},
        {value: '!U&!I', label: t('Не срочно и не важно')},
    ];

    return importanceInitial

};

export const importanceInitial = [
    {value: 'U&I', label: 'Важно и срочно'},
    {value: '!U&I', label: 'Важно и не срочно'},
    {value: 'U&!I', label: 'Срочно и не важно'},
    {value: '!U&!I', label: 'Не срочно и не важно'},
]