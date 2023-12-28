import { ICreateTask } from '../models/ICreateTask';
import { IFindTasks } from '../models/IFindTasks';
import { ITask } from '../models/ITask';
import { ITaskPaginate } from '../models/ITaskPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ITasksRepository {
  findByTitle(title: string): Promise<ITask | null>;
  findById(id: number): Promise<ITask | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ITaskPaginate>;
  findAllByIds(tasks: IFindTasks[]): Promise<ITask[]>;
  create(data: ICreateTask): Promise<ITask>;
  save(task: ITask): Promise<ITask>;
  remove(task: ITask): Promise<void>;
}
