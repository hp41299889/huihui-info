export interface TableMetadata {
  key: string;
  label: string;
  preDisplay?: Function;
}

export type TableHook = () => {
  // TODO do not use any
  data: any[];
  fetcher: () => Promise<void>;
  loading: boolean;
};
