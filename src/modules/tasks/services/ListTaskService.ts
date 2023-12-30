import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import { ITaskPaginate } from '../domain/models/ITaskPaginate';
import TasksRepository from '../infra/typeorm/repositories/TasksRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListTaskService {
  constructor(
    @inject(TasksRepository)
    private taskRepository: ITasksRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<ITaskPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const tasks = await this.taskRepository.findAll({ page, skip, take });
    return tasks;
  }
}

export default ListTaskService;
