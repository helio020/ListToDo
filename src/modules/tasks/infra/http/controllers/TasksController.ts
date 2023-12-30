import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import ListTaskService from '@modules/tasks/services/ListTaskService';
import ShowTaskService from '@modules/tasks/services/ShowTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 10;
    const listTasks = container.resolve(ListTaskService);
    const tasks = await listTasks.execute({ page, limit });
    return response.json(tasks);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTask = container.resolve(ShowTaskService);
    const task = await showTask.execute({ id });
    return response.json(task);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const createTask = container.resolve(CreateTaskService);
    const task = await createTask.execute({
      title,
      description,
    });
    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, done } = request.body;
    const updateTask = container.resolve(UpdateTaskService);
    const task = await updateTask.execute({
      id,
      title,
      description,
      done,
    });
    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteTask = container.resolve(DeleteTaskService);
    await deleteTask.execute({ id });
    return response.json([]);
  }
}
