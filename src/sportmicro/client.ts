import type { SportmicroClientOptions, SportmicroQueryParams, SportmicroResponseEnvelope } from './types.js';

function buildUrl(baseUrl: string, path: string, query?: SportmicroQueryParams): string {
  const url = new URL(path, baseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export class SportmicroClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: SportmicroClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? 'https://football.sportmicro.com';
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async get<T>(path: string, query?: SportmicroQueryParams): Promise<SportmicroResponseEnvelope<T>> {
    const response = await this.fetchImpl(buildUrl(this.baseUrl, path, query), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Sportmicro request failed with status ${response.status} for ${path}`);
    }

    const json = (await response.json()) as T[];
    return { items: Array.isArray(json) ? json : [], status: response.status };
  }
}
