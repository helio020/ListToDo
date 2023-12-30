import { Router } from 'express';
import TasksController from '../controllers/TasksController';
import { Joi, Segments, celebrate } from 'celebrate';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.index);

tasksRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.show,
);

tasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  tasksController.create,
);

tasksRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      done: Joi.boolean(),
    },
  }),
  tasksController.update,
);

tasksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.delete,
);

export default tasksRouter;
