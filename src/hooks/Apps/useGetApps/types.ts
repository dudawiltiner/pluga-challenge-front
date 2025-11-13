import { App } from '@app-types/app.types';

export interface RequestApps {
  url?: string;
}

export type ResponseApps = App[];

export interface UseAppsProps {
  fetchGetApps: (data: RequestApps) => Promise<ResponseApps>;
}

export interface ResponseError {
  message: string[];
}
