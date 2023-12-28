import { ITask } from './ITask';

export interface ITaskPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ITask[];
}
