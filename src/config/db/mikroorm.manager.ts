import { EntityManager } from '@mikro-orm/postgresql';

export class OrmManager {
  private static em: EntityManager;

  static setManager(em: EntityManager) {
    this.em = em;
  }

  static getManager() {
    if (!this.em) {
      throw new Error('EntityManager not initialized');
    }

    return this.em.fork();
  }
}
