import { importanceFilterInitialValue } from "./ImportanceFilterInitValue"

type ReturnImportanceFilterValues<T> = T extends (...args:unknown[])=>infer R
    ? R extends readonly {value:string}[]
        ? R[number]['value']
        : never
    : never

export type ImportanceFilterValues = ReturnImportanceFilterValues<typeof importanceFilterInitialValue>|'not chosen'