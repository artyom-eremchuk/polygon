import { MikroOrmModule } from '@mikro-orm/nestjs';
import dbConfig from './mikroorm.config';

export const getDatabaseModule = () =>
  MikroOrmModule.forRootAsync({
    useFactory: () => dbConfig,
  });
