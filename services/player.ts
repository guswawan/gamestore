import callAPI from '../config/api';
import { CheckoutTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export default async function getFeaturedGame() {
  const url = `${ROOT_API}/${API_VERSION}/players/landingpage`;

  return callAPI({
    url,
    method: 'GET',
    data: url,
  });
}

export async function getDetailVoucher(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    data: url,
  });
}

export async function getGameCategory() {
  const url = `${ROOT_API}/${API_VERSION}/players/category`;

  return callAPI({
    url,
    method: 'GET',
    data: url,
  });
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/players/checkout`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}
