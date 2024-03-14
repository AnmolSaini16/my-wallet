import { FacetedFilterName } from "@/constants/enum/dataTable.enum";
import { ColumnDef } from "@tanstack/react-table";

export interface DataTableColumnDef<T> {
  config: DataTableConfig;
  columns: ColumnDef<T>[];
}

export type DataTableConfig = {
  [key in FacetedFilterName]: {
    label: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  };
};
