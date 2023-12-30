import { inject, injectable } from 'tsyringe';
import { IUpdateTask } from '../domain/models/IUpdateTask';
import { ITask } from '../domain/models/ITask';
import AppError from '@shared/errors/AppError';
import { ITasksRepository } from '../domain/repositories/ITasksRepository';
import TasksRepository from '../infra/typeorm/repositories/TasksRepository';

@injectable()
class UpdateTaskService {
  constructor(
    @inject(TasksRepository)
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({
    id,
    title,
    description,
    done,
  }: IUpdateTask): Promise<ITask> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found.');
    }

    const taskExists = await this.tasksRepository.findByTitle(title);

    if (taskExists) {
      throw new AppError('There is already one task with this title.');
    }

    task.title = title;
    task.description = description;
    task.done = done;

    await this.tasksRepository.save(task);

    return task;
  }
}

export default UpdateTaskService;
