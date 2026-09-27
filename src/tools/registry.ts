import { z } from 'zod';
import { listQuerySchema, playerProjectionsQuerySchema, playerStatisticsQuerySchema } from '../sportmicro/schemas.js';
import type { SportmicroClient } from '../sportmicro/client.js';
import { makeToolResult } from './resource-format.js';

const idParam = z.object({ id: z.string().min(1) }).strict();

const playerStatisticToolInput = playerStatisticsQuerySchema;
const projectionToolInput = playerProjectionsQuerySchema;
const listToolInput = listQuerySchema;

export function createToolHandlers(client: SportmicroClient) {
  return {
    async sportmicro_get_players(input: unknown) {
      const parsed = listToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/players', parsed.data);
      return makeToolResult('players', parsed.data, items);
    },
    async sportmicro_get_teams(input: unknown) {
      const parsed = listToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/teams', parsed.data);
      return makeToolResult('teams', parsed.data, items);
    },
    async sportmicro_get_matches(input: unknown) {
      const parsed = listToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/matches', parsed.data);
      return makeToolResult('matches', parsed.data, items);
    },
    async sportmicro_get_player_statistics(input: unknown) {
      const parsed = playerStatisticToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/players-statistics', parsed.data);
      return makeToolResult('players-statistics', parsed.data, items);
    },
    async sportmicro_get_player_projections(input: unknown) {
      const parsed = projectionToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/player-projections', parsed.data);
      return makeToolResult('player-projections', parsed.data, items);
    },
    async sportmicro_get_player_projections_week(input: unknown) {
      const parsed = projectionToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/player-projections-week', parsed.data);
      return makeToolResult('player-projections-week', parsed.data, items);
    },
    async sportmicro_get_player_projections_season(input: unknown) {
      const parsed = projectionToolInput.safeParse(input ?? {});
      if (!parsed.success) throw new Error(`Invalid input: ${parsed.error.message}`);
      const { items } = await client.get('/player-projections-season', parsed.data);
      return makeToolResult('player-projections-season', parsed.data, items);
    }
  };
}

export const mcpToolDefinitions = [
  {
    name: 'sportmicro_get_players',
    description: 'Get documented Sportmicro football players with optional filters.'
  },
  {
    name: 'sportmicro_get_teams',
    description: 'Get documented Sportmicro football teams with optional filters.'
  },
  {
    name: 'sportmicro_get_matches',
    description: 'Get documented Sportmicro football matches with optional filters.'
  },
  {
    name: 'sportmicro_get_player_statistics',
    description: 'Get documented Sportmicro player statistics.'
  },
  {
    name: 'sportmicro_get_player_projections',
    description: 'Get documented Sportmicro player projections.'
  },
  {
    name: 'sportmicro_get_player_projections_week',
    description: 'Get documented Sportmicro weekly player projections.'
  },
  {
    name: 'sportmicro_get_player_projections_season',
    description: 'Get documented Sportmicro season player projections.'
  }
] as const;
