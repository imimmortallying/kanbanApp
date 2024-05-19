import { importanceFilterInitialValue } from "./ImportanceFilterInitValue"

type ReturnImportanceFilterValues<T> = T extends (...args:any)=>infer R
    ? R extends readonly any[]
        ? R[number]['value']
        : never
    : never

export type ImportanceFilterValues = ReturnImportanceFilterValues<typeof importanceFilterInitialValue>|'not chosen'