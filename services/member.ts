import callAPI from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export default async function getDataOverview() {
  const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDataMemberTransactions(valueParams: string) {
  let params = '';
  if (valueParams === '') {
    params = '';
  } else {
    params = `status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/players/transaction-history?${params}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getTransactionsDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/transaction-history/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}
