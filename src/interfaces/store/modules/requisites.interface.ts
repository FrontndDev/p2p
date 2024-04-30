export interface ICreateRequisiteParams {
  requisite: string;
  currency: string;
  payment_method: number;
}

export interface IUpdateRequisiteParams {
  id: number;
  data: {
    requisite: string;
    currency: string;
    payment_method: number;
  }
}