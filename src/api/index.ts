import {
  deleteAsync,
  getAsync,
  postAsync,
  putAsync
} from "@/api/config.ts";
import { IGetAdsParams } from "@/interfaces/store/modules/ads.interface.ts";
import { ICreateRequisiteParams } from "@/interfaces/store/modules/requisites.interface.ts";

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

export async function getAd(id: number) {
  return getAsync(`/api/v1/p2p/ads/${id}`)
}

export async function getProfileAds(page: number) {
  return getAsync(`/api/v1/p2p/profile/ads?page=${page}`)
}

export async function getPaymentMethodsByCurrency(currency: string) {
  return getAsync(`/api/v1/p2p/payment-method?currency=${currency}`)
}

export async function getProfile() {
  return getAsync('/api/v1/p2p/profile')
}

export async function getTransactionInfo(id: number) {
  return getAsync(`/api/v1/p2p/transaction/${id}`)
}

export async function getCurrencyRate(data: any) {
  return getAsync(`/api/v1/p2p/currency/rate?fromCurrency=${data.from}&toCurrency=${data.to}`)
}

export async function getTransactionsHistory() {
  return getAsync(`/api/v1/p2p/transaction/buying-history`)
}

// POST

export async function createRequisite(data: ICreateRequisiteParams) {
  return postAsync('/api/v1/p2p/profile/requisite', data)
}

export async function topUpWallet(data: any) {
  return postAsync(`/api/v1/p2p/profile/wallet/top-up`, data)
}

export async function withdrawWallet(data: any) {
  return postAsync(`/api/v1/p2p/profile/wallet/withdraw`, data)
}

export async function createAd(data: any) {
  return postAsync(`/api/v1/p2p/profile/ads`, data)
}

export async function createDeal(data: any) {
  return postAsync(`/api/v1/p2p/transaction`, data)
}

// PUT

export async function updateRequisite(id: number, data: any) {
  return putAsync(`/api/v1/p2p/profile/requisite/${id}`, data)
}

export async function updateAd(id: number, data: any) {
  return putAsync(`/api/v1/p2p/profile/ads/${id}`, data)
}

export async function updateAdStatus(id: number) {
  return putAsync(`/api/v1/p2p/profile/ads/status/${id}`, {})
}

export async function acceptDeal(id: number) {
  return putAsync(`/api/v1/p2p/profile/transaction/status/${id}`, {})
}

export async function cancelDeal(id: number) {
  return putAsync(`/api/v1/p2p/transaction/decline/${id}`, {})
}

// DELETE

export async function deleteRequisite(id: number) {
  return deleteAsync(`/api/v1/p2p/profile/requisite/${id}`)
}

export async function deleteAd(id: number) {
  return deleteAsync(`/api/v1/p2p/profile/ads/${id}`)
}