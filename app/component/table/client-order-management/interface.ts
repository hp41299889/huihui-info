import { ReactNode } from "react";

export type TableDatas<T> = Array<T> | T[];

export interface TableMetadata<T> {
  key: string;
  label: string;
  preProcess?: (value: T) => ReactNode;
  width?: string;
}

export interface TableHook<T> {
  (): { data: T[]; fetcher: () => Promise<void>; loading: boolean };
}
