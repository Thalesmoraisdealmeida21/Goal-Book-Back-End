import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import GoalMonth from '../infra/typeorm/entities/GoalMonth';
import IGoalMonthRepository from '../repositories/IGoalMonthRepository';
import IGoalRepository from '../repositories/IGoalRepository';

interface IRequest {
  title: string;
  pages: number;
  image: string;
  idGoogle: string;

  month: string;
  goalId: string;
}

@injectable()
class AddBookInMonthGoalService {
  constructor(
    @inject('GoalMonthRepository')
    private goalsMonthRepository: IGoalMonthRepository,

    @inject('GoalsRepository')
    private goalsRepository: IGoalRepository,
  ) {}

  public async execute(data: IRequest): Promise<GoalMonth> {
    const monthExist = await this.goalsMonthRepository.findBookMonthInGoal(
      data.month,
      data.goalId,
      data.idGoogle,
    );

    if (monthExist) {
      throw new AppError('This book in this month already exists');
    }

    const goal = await this.goalsRepository.findById(data.goalId);

    if (!goal) {
      throw new AppError('This Goal does not exists');
    }

    const goalMonth = await this.goalsMonthRepository.create({
      ...data,
      status: true,
    });

    return goalMonth;
  }
}

export default AddBookInMonthGoalService;
