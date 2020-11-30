import { container } from 'tsyringe';

import IGoalRepository from '@modules/goal/repositories/IGoalRepository';
import GoalRepository from '@modules/goal/infra/typeorm/repositories/GoalRepository';

container.registerSingleton<IGoalRepository>('GoalsRepository', GoalRepository);
