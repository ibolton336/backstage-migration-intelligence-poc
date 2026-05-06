import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

/**
 * Migration Intelligence plugin — visualize and manage application migrations
 * from legacy frameworks to modern runtimes (e.g., Java EE → Quarkus).
 */
export const migrationIntelligencePlugin = createPlugin({
  id: 'migration-intelligence',
  routes: {
    root: rootRouteRef,
  },
});

/**
 * The main page component for the Migration Intelligence plugin.
 * Renders a dashboard with application migration status, available migrators,
 * and the ability to initiate new migrations.
 */
export const MigrationIntelligencePage = migrationIntelligencePlugin.provide(
  createRoutableExtension({
    name: 'MigrationIntelligencePage',
    component: () =>
      import('./components/MigrationDashboardPage').then(
        m => m.MigrationDashboardPage,
      ),
    mountPoint: rootRouteRef,
  }),
);
