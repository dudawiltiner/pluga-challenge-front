import { appsApi } from '@services/axiosConfig';

import { RequestApps, ResponseApps } from './types';

const DEFAULT_APPS_URL = '/ferramentas_search.json';

export async function fetchGetApps(
  requestData: RequestApps
): Promise<ResponseApps> {
  const url = requestData.url || DEFAULT_APPS_URL;

  const response = await appsApi.get<ResponseApps>(url);

  return response.data;
}
