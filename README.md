# Migration Intelligence — RHDH Plugin (POC)

POC workspace for the **migration intelligence** RHDH plugin, structured to match [`redhat-developer/rhdh-plugins`](https://github.com/redhat-developer/rhdh-plugins) conventions.

## Structure

```
workspaces/migration-intelligence/     ← Workspace (same layout as rhdh-plugins)
├── .changeset/                        ← Changesets for versioning
├── plugins/
│   └── migration-intelligence/        ← @red-hat-developer-hub/backstage-plugin-migration-intelligence
├── package.json                       ← Workspace root (@internal/migration-intelligence)
├── backstage.json                     ← Backstage 1.49.4
└── tsconfig.json
```

## Getting Started

```bash
cd workspaces/migration-intelligence
yarn install
yarn start
```

## Moving to rhdh-plugins

When ready to submit upstream:

1. Copy `workspaces/migration-intelligence/` into your fork of `redhat-developer/rhdh-plugins`
2. Add CODEOWNERS entry
3. Create changeset
4. Open PR

See [CONTRIBUTING.md](https://github.com/redhat-developer/rhdh-plugins/blob/main/CONTRIBUTING.md) for full instructions.
