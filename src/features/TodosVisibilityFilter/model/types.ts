import { ImportanceFilterValues } from "entities/ImportanceFilterInitValue/types";

type AccomplishmentValues = "all" | "closed" | "opened";

export interface IVisibilityFilter {
  accomplishment: AccomplishmentValues;
  importance: ImportanceFilterValues[];
}
