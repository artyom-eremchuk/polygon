import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroORM } from '@mikro-orm/postgresql';
import { getDatabaseModule } from './config/db/db';
import { MigrationService } from './config/db/migration.service';
import { Envs } from './config/envs/envs';
import { UserModule } from './modules/users/entities/user.module';
import { OrmManager } from './config/db/mikroorm.manager';

@Module({
  imports: [getDatabaseModule(), UserModule],
  controllers: [AppController],
  providers: [MigrationService, AppService],
})
export class AppModule {
  constructor(
    private readonly migrationService: MigrationService,
    orm: MikroORM,
  ) {
    OrmManager.setManager(orm.em);
  }

  async onApplicationBootstrap() {
    if (Envs.db.migrationRun) await this.migrationService.migrate();
  }
}
