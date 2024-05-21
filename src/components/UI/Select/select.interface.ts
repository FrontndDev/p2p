import { ComputedRef } from "vue";

export interface ISelect {
  id: number;
  name: string;
  icon?: SVGAElement | string;
}

export interface ISelects {
  id: number;
  title: string;
  placeholder?: string;
  items: ISelect[];
  selectedItem: ComputedRef<ISelect | null>;
}