import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class BaseEntity {
  @PrimaryKey()
  id!: number;
}
