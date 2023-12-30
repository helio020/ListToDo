import { inject, injectable } from 'tsyringe';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import { ITask } from '../domain/models/ITask';
import { ICreateTask } from '../domain/models/ICreateTask';
import AppError from '@shared/errors/AppError';
import TasksRepository from '../infra/typeorm/repositories/TasksRepository';

@injectable()
class CreateTaskService {
  constructor(
    @inject(TasksRepository)
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ title, description }: ICreateTask): Promise<ITask> {
    const taskExists = await this.tasksRepository.findByTitle(title);

    if (taskExists) {
      throw new AppError('Task already exists.');
    }

    const task = await this.tasksRepository.create({ title, description });

    return task;
  }
}

export default CreateTaskService;
