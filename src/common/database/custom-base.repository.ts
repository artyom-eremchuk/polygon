import { EntityData, FilterQuery } from '@mikro-orm/core/typings';
import { QueryBuilder, SqlEntityRepository } from '@mikro-orm/postgresql';

export class CustomBaseRepository<
  ENTITY extends object,
> extends SqlEntityRepository<ENTITY> {
  protected ALIAS!: string;

  getSelectQueryBuilder(): QueryBuilder<ENTITY> {
    return this.createQueryBuilder(this.ALIAS);
  }

  update(
    where: FilterQuery<ENTITY>,
    data: EntityData<ENTITY>,
  ): Promise<number> {
    const updateObject = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined && key),
    );

    return this.nativeUpdate(where, <EntityData<ENTITY>>updateObject);
  }
}
