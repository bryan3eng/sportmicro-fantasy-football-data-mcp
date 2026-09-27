export interface ToolMeta {
  resource: string;
  query: Record<string, unknown>;
  count: number;
  empty: boolean;
}

export function makeToolResult<T>(resource: string, query: Record<string, unknown>, items: T[]) {
  return {
    items,
    meta: {
      resource,
      query,
      count: items.length,
      empty: items.length === 0
    } satisfies ToolMeta
  };
}
