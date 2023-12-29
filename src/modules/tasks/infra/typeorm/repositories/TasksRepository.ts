import { ITasksRepository } from 'src/modules/tasks/domain/repositories/ITasksRepository';
import { In, Repository } from 'typeorm';
import { dataSource } from 'src/shared/infra/typeorm';
import { ICreateTask } from 'src/modules/tasks/domain/models/ICreateTask';
import Task from '../entities/Task';
import { ITaskPaginate } from '@modules/tasks/domain/models/ITaskPaginate';
import { IFindTasks } from '@modules/tasks/domain/models/IFindTasks';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Task);
  }

  public async create({ title, description }: ICreateTask): Promise<Task> {
    const task = this.ormRepository.create({ title, description });

    await this.ormRepository.save(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    await this.ormRepository.save(task);

    return task;
  }

  public async remove(task: Task): Promise<void> {
    await this.ormRepository.remove(task);
  }

  public async findByTitle(title: string): Promise<Task | null> {
    const task = this.ormRepository.findOneBy({ title });

    return task;
  }

  public async findById(id: string): Promise<Task | null> {
    const task = this.ormRepository.findOneBy({ id });

    return task;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ITaskPaginate> {
    const [tasks, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: tasks,
    };

    return result;
  }

  public async findAllByIds(tasks: IFindTasks[]): Promise<Task[]> {
    const tasksIds = tasks.map(task => task.id);

    const existsTasks = await this.ormRepository.find({
      where: {
        id: In(tasksIds),
      },
    });

    return existsTasks;
  }
}

export default TasksRepository;
