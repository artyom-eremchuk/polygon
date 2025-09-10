import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {
  async getAllUsers() {
    const users = await this.em
      .createQueryBuilder(UserEntity, 'u')
      .select('*')
      .execute();

    console.log(users);
  }
}
