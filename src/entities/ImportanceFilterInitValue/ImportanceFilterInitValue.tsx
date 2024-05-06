
export const importanceFilterInitialValue = (t:any) => { return [
    {value: 'U&I', label: t('Важно и срочно')},
    {value: '!U&I', label: t('Важно и не срочно')},
    {value: 'U&!I', label: t('Срочно и не важно')},
    {value: '!U&!I', label: t('Не срочно и не важно')},
]}