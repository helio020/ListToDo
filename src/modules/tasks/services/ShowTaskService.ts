import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import { IShowTask } from '../domain/models/IShowTask';
import { ITask } from '../domain/models/ITask';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ id }: IShowTask): Promise<ITask> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found.');
    }

    return task;
  }
}

export default ShowTaskService;
