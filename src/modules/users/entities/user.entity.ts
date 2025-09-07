import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ default: 'now()' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
