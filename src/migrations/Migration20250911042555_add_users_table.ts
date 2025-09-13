import { Migration } from '@mikro-orm/migrations';

export class Migration20250911042555_add_users_table extends Migration {
  up(): void {
    this.addSql(`
      create table if not exists "users" (
        id serial primary key,
        first_name text not null,
        last_name text not null,
        birth_date date not null,
        email text null,
        created_at timestamptz not null default now(),
        updated_at timestamptz null,
        deleted_at timestamptz null
      )
    `);

    this.addSql(`
      insert into "users" (
        first_name, 
        last_name, 
        birth_date,
        email,
        created_at
      ) 
      values 
        ('Иван', 'Иванов', '1978-03-15', 'ivan.ivanov@example.com', now()),
        ('Мария', 'Петрова', '1965-07-22', 'maria.petrova@example.com', now()),
        ('Сергей', 'Смирнов', '1999-11-08', null, now()),
        ('Ольга', 'Кузнецова', '1982-01-30', 'olga.kuznetsova@example.com', now()),
        ('Алексей', 'Попов', '2001-05-17', null, now()),
        ('Елена', 'Васильева', '1973-09-14', 'elena.vasileva@example.com', now()),
        ('Дмитрий', 'Соколов', '1995-12-03', 'dmitry.sokolov@example.com', now()),
        ('Наталья', 'Михайлова', '1968-04-25', 'natalya.mikhailova@example.com', now()),
        ('Андрей', 'Новиков', '1989-08-19', null, now()),
        ('Анна', 'Федорова', '2005-06-11', 'anna.fedorova@example.com', now())
    `);

    this.addSql(`
      create or replace function update_updated_at_column()
      returns trigger as $$
      begin
        new.updated_at = now();
        return new;
      end;
      $$ language plpgsql;

      create trigger trigger_users_updated_at
        before update on "users"
        for each row
        execute function update_updated_at_column();
    `);
  }

  down(): void {
    this.addSql(`drop trigger if exists trigger_users_updated_at on "users";`);

    this.addSql(`drop function if exists update_updated_at_column;`);

    this.addSql(`drop table if exists "users";`);
  }
}
