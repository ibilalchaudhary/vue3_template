import type { TableBaseColumn } from 'naive-ui/lib/data-table/src/interface';
import { ComponentType } from './componentType';
export interface BasicColumn extends TableBaseColumn {
  // Edit form
  edit?: boolean;
  editRow?: boolean;
  editable?: boolean;
  editComponent?: ComponentType;
  editComponentProps?: Recordable;
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  editValueMap?: (value: any) => string;
  onEditRow?: () => void;
  // Whether the permission code control is displayed
  auth?: string[];
  // Whether the business control is displayed
  ifShow?: boolean | ((column: BasicColumn) => boolean);
  // Controls whether to support drag and drop, the default support
  draggable?: boolean;
}

export interface TableActionType {
  reload: (opt) => Promise<void>;
  emit?: any;
  getColumns: (opt?) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
}

export interface BasicTableProps {
  title?: string;
  dataSource: Function;
  columns: any[];
  pagination: object;
  showPagination: boolean;
  actionColumn: any[];
  canResize: boolean;
  resizeHeightOffset: number;
  loading: boolean;
}
