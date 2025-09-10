import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserRepository } from '../repositories/user.repository';

@Entity({ tableName: 'users', repository: () => UserRepository })
export class UserEntity extends BaseEntity {
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  phoneNumber!: string;

  @Property({ default: 'now()' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
