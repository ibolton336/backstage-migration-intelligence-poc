# Migration Intelligence — RHDH Dynamic Plugin (POC)

A proof-of-concept **Red Hat Developer Hub** dynamic plugin for migration intelligence — visualizing and managing application migrations (Java EE → Quarkus, Spring Boot → Quarkus, etc.).

Part of the [Konveyor](https://github.com/konveyor) ecosystem.

## What This Demonstrates

- **RHDH Dynamic Plugin** — Built for the new frontend plugin system (`@backstage/frontend-plugin-api`) with full backward compat (`alpha.tsx` + legacy `plugin.ts`)
- **Migration Dashboard** — Single-page plugin at `/migration-intelligence` showing:
  - Application portfolio with migration status
  - Available migration agents ("Migrators")
  - Start Migration wizard (3-step dialog)
- **Catalog Entities** — Backstage-native modeling with `konveyor.io/*` annotations

## Compatible With

| RHDH Version | Backstage Version |
|---|---|
| next / 1.10 | 1.49.4 |

## Quick Start

### Prerequisites

- Node.js 18 or 20
- Yarn 4.x
- Podman or Docker (for running RHDH locally)

### Build

```bash
yarn install
yarn tsc
yarn build
```

### Export as Dynamic Plugin

```bash
# Package and export to local directory
yarn export-dynamic
```

### Run Locally with RHDH Container

```bash
# Export the plugin first
yarn export-dynamic

# Start RHDH with the plugin mounted
./run-rhdh.sh
```

Then visit: **http://localhost:7007/migration-intelligence**

### Development (standalone)

```bash
cd plugins/migration-intelligence
yarn start
```

## Deploying to OpenShift

### 1. Package as OCI Artifact

```bash
export QUAY_USERNAME=your-username

npx -y @red-hat-developer-hub/cli plugin package \
  --tag quay.io/$QUAY_USERNAME/migration-intelligence:latest

podman push quay.io/$QUAY_USERNAME/migration-intelligence:latest
```

### 2. Configure in RHDH

Add to your Developer Hub ConfigMap:

```yaml
dynamicPlugins:
  frontend:
    konveyor.backstage-plugin-migration-intelligence:
      appIcons:
        - name: migrationIcon
          importName: MigrationIcon
      dynamicRoutes:
        - path: /migration-intelligence
          importName: MigrationIntelligencePage
          menuItem:
            text: 'Migration Intelligence'
            icon: migrationIcon
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│  RHDH Frontend (this plugin)                    │
│  ┌───────────────────────────────────────────┐  │
│  │  /migration-intelligence                  │  │
│  │  • App table + status + progress          │  │
│  │  • Migrator cards                         │  │
│  │  • Start Migration wizard                 │  │
│  └───────────────────────────────────────────┘  │
├─────────────────────────────────────────────────┤
│  Backstage Catalog (konveyor.io/* annotations)  │
│  • Component: apps being migrated               │
│  • Resource: migration targets                  │
│  • API: migrator agent endpoints                │
├─────────────────────────────────────────────────┤
│  Future: Backend Plugin                         │
│  • Talks to Konveyor Hub /taskgroups API        │
│  • Creates migrations via addon-kai             │
│  • Streams progress updates                     │
└─────────────────────────────────────────────────┘
```

## File Structure

```
├── app-config.yaml              # Root RHDH config (DB, auth, catalog)
├── backstage.json               # Backstage version pin (1.49.4)
├── run-rhdh.sh                  # Run RHDH container locally
├── examples/
│   └── entities.yaml            # Sample catalog entities
├── plugins/
│   └── migration-intelligence/
│       ├── app-config.yaml      # Dynamic plugin frontend config
│       ├── package.json         # RHDH-compatible deps
│       ├── dev/index.tsx        # Standalone dev harness
│       └── src/
│           ├── index.ts         # Public exports
│           ├── plugin.ts        # Legacy plugin API
│           ├── alpha.tsx        # New frontend plugin system
│           ├── routes.ts        # Route refs
│           ├── icons.tsx        # MigrationIcon for nav
│           └── components/
│               ├── MigrationDashboardPage/
│               └── StartMigrationDialog/
```

## Roadmap

- [ ] Backend plugin → Konveyor Hub API integration
- [ ] Real-time migration status via TaskGroup polling
- [ ] Catalog entity provider (auto-discover from Hub)
- [ ] Migration diff viewer
- [ ] Integration with tackle2-addon-kai

## License

Apache-2.0
