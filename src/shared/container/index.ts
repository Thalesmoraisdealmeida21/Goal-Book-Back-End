import { container } from 'tsyringe';

import IGoalRepository from '@modules/goal/repositories/IGoalRepository';
import GoalRepository from '@modules/goal/infra/typeorm/repositories/GoalRepository';

import IGoalMonthRepository from '@modules/goal/repositories/IGoalMonthRepository';
import GoalMonthRepository from '@modules/goal/infra/typeorm/repositories/GoalMonthRepository';

container.registerSingleton<IGoalRepository>('GoalsRepository', GoalRepository);

container.registerSingleton<IGoalMonthRepository>(
  'GoalMonthRepository',
  GoalMonthRepository,
);
