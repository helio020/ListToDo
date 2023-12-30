import tasksRouter from '@modules/tasks/infra/http/routes/TaskRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/tasks', tasksRouter);

export default routes;
