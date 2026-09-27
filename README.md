# Fantasy Football Data MCP Server with Sportmicro API

A read-only [Model Context Protocol](https://modelcontextprotocol.io/) server for fantasy-football research that exposes grounded football data from [Sportmicro](https://sportmicro.com). It is designed for developers who want **fantasy football MCP server** workflows backed by documented Sportmicro endpoints instead of invented data.

The server uses the official `@modelcontextprotocol/sdk` with stdio transport and a typed Sportmicro football client. It validates inputs, keeps the API narrow, and returns source-shaped data for supported player, team, fixture, and statistics queries.

Sportmicro documentation used by this project: <https://docs.sportmicro.com/>

## Features

- Fantasy-data research MCP tools
- Player, team, and fixture queries when documented
- Typed source-data responses
- Clear scope boundaries
- Input validation
- Read-only operation

## What this server does

This project focuses on a small set of documented Sportmicro football resources:

- `players`
- `teams`
- `matches`
- `players-statistics`
- `player-projections`
- `player-projections-week`
- `player-projections-season`

The server intentionally does **not** claim fantasy scoring, transfers, or broader football workflows unless they are directly backed by documented Sportmicro endpoints.

## Prerequisites

- Node.js 18 or newer
- An API key from Sportmicro

## Installation

```bash
npm install
```

## Environment variables

Create a local `.env` file or export the environment variable directly:

```bash
SPORTMICRO_API_KEY=your_key_here
```

A template is included in `.env.example`.

## Run

Build the project and start the MCP server via stdio:

```bash
npm run build
node dist/index.js
```

The process is intended to be launched by an MCP client that connects over stdio.

## Available MCP tools

This repository exposes narrow read-only tools for Sportmicro football data:

- `sportmicro_get_players`
- `sportmicro_get_teams`
- `sportmicro_get_matches`
- `sportmicro_get_player_statistics`
- `sportmicro_get_player_projections`
- `sportmicro_get_player_projections_week`
- `sportmicro_get_player_projections_season`

Each tool validates its input and returns structured results with a `meta` block that describes the query and record count.

## Example usage

A client can request players for a team like this:

```json
{
  "team_id": "123",
  "limit": 10
}
```

Example response shape:

```json
{
  "items": [],
  "meta": {
    "resource": "players",
    "query": {
      "team_id": "123",
      "limit": 10
    },
    "count": 0,
    "empty": true
  }
}
```

## Project structure

```text
src/
  index.ts                MCP server entrypoint
  config.ts               Environment validation
  sportmicro/
    client.ts             Typed Sportmicro football client
    schemas.ts            Runtime validation and request schemas
    types.ts              Shared TypeScript types
  tools/
    registry.ts           MCP tool registration and handlers
    resource-format.ts    Normalized response helpers
  test/
    sportmicro-client.test.ts
    tool-contracts.test.ts
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

Tests use mocked Sportmicro responses and verify the tool contracts without making live API calls.

## API usage notes

Supported requests are limited to the documented Sportmicro football endpoints listed above. This repository does not invent endpoints or fields. If Sportmicro returns empty, partial, or unavailable data, the server preserves that state so clients can handle it explicitly.

## Known limitations

- Only the documented read-only football endpoints are supported.
- The server does not implement fantasy scoring, transfers, or betting advice.
- Live coverage is limited to the endpoints documented by Sportmicro.
- Response fields are normalized only enough to provide safe, typed access without claiming undocumented semantics.

## License

MIT
