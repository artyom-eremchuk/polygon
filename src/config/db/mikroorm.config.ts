import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Envs } from '../envs/envs';

export default defineConfig({
  driver: PostgreSqlDriver,
  disableIdentityMap: true,
  extensions: [Migrator],
  host: Envs.db.host,
  port: Envs.db.port,
  user: Envs.db.username,
  password: Envs.db.password,
  dbName: Envs.db.name,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  strict: true,
  ignoreUndefinedInQuery: true,
  validate: true,
  forceUtcTimezone: true,
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
    snapshot: false,
    tableName: 'mikro_orm_migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
    disableForeignKeys: false,
  },
});
