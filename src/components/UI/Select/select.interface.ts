import { ComputedRef } from "vue";

export interface ISelect {
  id: number;
  icon?: SVGAElement | string;
  name: string;
}

export interface ISelects {
  id: number;
  title: string;
  items: ISelect[];
  selectedItem: ComputedRef<ISelect | null>;
}