import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Envs } from './Envs';

const dbConfig: MikroOrmModuleSyncOptions = {
  driver: PostgreSqlDriver,
  host: Envs.db.host,
  user: Envs.db.user,
  password: Envs.db.password,
  port: Envs.db.port,
  dbName: Envs.db.name,
  entities: ['./dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['./src/**/*.entity{.ts,.js}'],
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
    disableForeignKeys: false,
  },
  strict: true,
  validate: true,
  forceUtcTimezone: true,
};

export default dbConfig;
