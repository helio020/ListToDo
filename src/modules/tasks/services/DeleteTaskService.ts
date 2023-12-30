import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import { IDeleteTask } from '../domain/models/IDeleteTask';
import AppError from '@shared/errors/AppError';
import TasksRepository from '../infra/typeorm/repositories/TasksRepository';

@injectable()
class DeleteTaskService {
  constructor(
    @inject(TasksRepository)
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ id }: IDeleteTask): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found.');
    }

    await this.tasksRepository.remove(task);
  }
}

export default DeleteTaskService;
