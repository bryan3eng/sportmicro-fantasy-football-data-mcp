export type SportmicroQueryParams = Record<string, string | number | boolean | undefined>;

export interface SportmicroRequestOptions {
  path: string;
  query?: SportmicroQueryParams;
}

export interface SportmicroClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export interface SportmicroResponseEnvelope<T> {
  items: T[];
  status: number;
}
