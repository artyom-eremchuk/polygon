import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './modules/users/entities/user.module';
import dbConfig from './configs/dbConfig';

@Module({
  imports: [MikroOrmModule.forRoot(dbConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
