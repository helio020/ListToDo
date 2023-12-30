import Task from '@modules/tasks/infra/typeorm/entities/Task';
import { DataSource } from 'typeorm';
import { CreateTasks1703949339910 } from './migrations/1703949339910-CreateTasks';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '43710',
  database: 'tasks',
  entities: [Task],
  migrations: [CreateTasks1703949339910],
});
