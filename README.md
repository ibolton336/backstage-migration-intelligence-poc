# Migration Intelligence — Backstage Plugin POC

A proof-of-concept Backstage plugin for **migration intelligence** — visualizing and managing application migrations (Java EE → Quarkus, Spring Boot → Quarkus, etc.) through the Backstage developer portal.

Part of the [Konveyor](https://github.com/konveyor) ecosystem.

## What This Demonstrates

- **Migration Dashboard** — A single-page Backstage plugin showing:
  - Applications and their migration status
  - Available migration agents ("Migrators")
  - Ability to kick off migrations from the portal
- **Catalog Entities** — Backstage-native catalog modeling for:
  - Applications under migration
  - Migrator configs (agent + skill combos)
  - Migration target definitions

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Backstage Frontend (this plugin)               │
│  ┌───────────────────────────────────────────┐  │
│  │  Migration Dashboard Page                 │  │
│  │  • Application table + status             │  │
│  │  • Migrator selector                      │  │
│  │  • Start Migration action                 │  │
│  └───────────────────────────────────────────┘  │
├─────────────────────────────────────────────────┤
│  Backstage Catalog (entities)                   │
│  • Component: applications being migrated       │
│  • Resource: migration targets                  │
│  • API: migrator agent endpoints                │
├─────────────────────────────────────────────────┤
│  Future: Backend Plugin                         │
│  • Talks to Konveyor Hub API                    │
│  • Creates TaskGroups for addon-kai             │
│  • Streams migration progress                   │
└─────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Install dependencies
yarn install

# Start in development mode (standalone, no full Backstage app needed)
cd plugins/migration-intelligence
yarn start
```

## Integrating into a Backstage App

1. Add the plugin to your Backstage app:

```bash
cd packages/app
yarn add @konveyor/plugin-migration-intelligence
```

2. Add the route in `App.tsx`:

```tsx
import { MigrationIntelligencePage } from '@konveyor/plugin-migration-intelligence';

// In your routes:
<Route path="/migration-intelligence" element={<MigrationIntelligencePage />} />
```

3. Add catalog entity locations in `app-config.yaml`:

```yaml
catalog:
  locations:
    - type: file
      target: ../../examples/entities.yaml
```

## Catalog Entities

See [`examples/entities.yaml`](./examples/entities.yaml) for sample entities:

| Kind | Name | Description |
|------|------|-------------|
| Component | coolstore-app | Sample Java EE app being migrated |
| Component | inventory-service | Sample Spring Boot microservice |
| Resource | quarkus-3-target | Migration target definition |
| API | kai-migrator | The AI migration agent endpoint |

## Development

```bash
# Run tests
yarn test

# Build
yarn build

# Lint
yarn lint
```

## Roadmap

- [ ] Real backend plugin connecting to Konveyor Hub API
- [ ] Live migration status via TaskGroup polling
- [ ] Integration with `tackle2-addon-kai` for AI-powered migrations
- [ ] Migration history and diff viewer
- [ ] Catalog entity provider (auto-discover apps from Hub)

## License

Apache-2.0
