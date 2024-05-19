import { TFunction } from "i18next/typescript/t"

export const importanceFilterInitialValue = (t:TFunction<"translation", undefined>) => [
    {value: 'U&I', label: t('Важно и срочно')},
    {value: '!U&I', label: t('Важно и не срочно')},
    {value: 'U&!I', label: t('Срочно и не важно')},
    {value: '!U&!I', label: t('Не срочно и не важно')},
] as const

export type ReturnTytpeofImportanceFilterInitialValue = ReturnType<typeof importanceFilterInitialValue>
