# Migration Intelligence

This workspace contains the RHDH plugins for **migration intelligence** — visualizing and managing application migrations (Java EE → Quarkus, Spring Boot → Quarkus, etc.) through Red Hat Developer Hub.

Part of the [Konveyor](https://github.com/konveyor) ecosystem.

## Plugins

| Plugin | Description |
|--------|-------------|
| [`@red-hat-developer-hub/backstage-plugin-migration-intelligence`](./plugins/migration-intelligence/) | Frontend plugin — migration dashboard, status tracking, and start-migration wizard |

## Development

```bash
cd workspaces/migration-intelligence
yarn install
yarn start
```

## What It Demonstrates

- **Migration Dashboard** at `/migration-intelligence` — application portfolio with migration status, available migrators, start-migration wizard
- **Catalog Entities** — Backstage-native modeling with `konveyor.io/*` annotations for migration metadata
- **Dynamic Plugin Ready** — `alpha.tsx` with new frontend plugin system for RHDH dynamic loading
