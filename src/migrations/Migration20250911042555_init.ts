import { Migration } from '@mikro-orm/migrations';

export class Migration20250911042555_init extends Migration {
  up(): void {
    this.addSql(`
      create table if not exists "users" (
        id serial primary key,
        first_name text not null,
        last_name text not null,
        birth_date date not null,
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
        created_at
      ) 
      values 
        ('James', 'Smith', '1978-03-15', now()),
        ('Mary', 'Johnson', '1965-07-22', now()),
        ('John', 'Williams', '1999-11-08', now()),
        ('Patricia', 'Brown', '1982-01-30', now()),
        ('Robert', 'Jones', '2001-05-17', now()),
        ('Jennifer', 'Garcia', '1973-09-14', now()),
        ('Michael', 'Miller', '1995-12-03', now()),
        ('Linda', 'Davis', '1968-04-25', now()),
        ('William', 'Rodriguez', '1989-08-19', now()),
        ('Elizabeth', 'Martinez', '2005-06-11', now())
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
