import 'reflect-metadata';
import { dataSource } from '../typeorm';
import { app } from './app';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3000);
});
