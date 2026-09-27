import { z } from 'zod';

export const listQuerySchema = z.object({
  id: z.string().optional(),
  player_id: z.string().optional(),
  team_id: z.string().optional(),
  league_id: z.string().optional(),
  season_id: z.string().optional(),
  tournament_id: z.string().optional(),
  round_id: z.string().optional(),
  arena_id: z.string().optional(),
  referee_id: z.string().optional(),
  home_team_id: z.string().optional(),
  away_team_id: z.string().optional(),
  week_start: z.string().optional(),
  limit: z.number().int().positive().max(50).optional(),
  offset: z.number().int().nonnegative().optional(),
  lang: z.string().optional()
}).strict();

export const playerStatisticsQuerySchema = z.object({
  player_id: z.string().min(1),
  team_id: z.string().optional(),
  league_id: z.string().optional(),
  season_id: z.string().optional(),
  type: z.string().optional(),
  limit: z.number().int().positive().max(50).optional(),
  offset: z.number().int().nonnegative().optional(),
  lang: z.string().optional()
}).strict();

export const playerProjectionsQuerySchema = z.object({
  player_id: z.string().optional(),
  team_id: z.string().optional(),
  league_id: z.string().optional(),
  season_id: z.string().optional(),
  match_id: z.string().optional(),
  week_start: z.string().optional(),
  limit: z.number().int().positive().max(50).optional(),
  offset: z.number().int().nonnegative().optional(),
  lang: z.string().optional()
}).strict();
