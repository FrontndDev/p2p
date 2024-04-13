import { getAsync } from "@/api/config.ts";
import { IGetAdsParams } from "@/interfaces/store/modules/ads.interface.ts";

export function setDataToLS(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLS(key: string) {
  const data: string | null = localStorage.getItem(key);

  return data && data !== "undefined" ? JSON.parse(data) : null;
}

// GET

export async function getServiceInformation() {
  return getAsync('/api/v1/p2p');
}

export async function getAds({ currency, page, min_amount, payment_method_id }: IGetAdsParams) {
  const query = `?inner_currency=${currency.inner}&outer_currency=${currency.outer}&page=${page}&min_amount=${min_amount}&payment_method_id=${payment_method_id}`
  return getAsync(`/api/v1/p2p/ads` + query);
}

export async function getPaymentMethodsByCurrency(currency: string) {
  return getAsync(`/api/v1/p2p/payment-method?currency=${currency}`)
}


// POST

// PUT