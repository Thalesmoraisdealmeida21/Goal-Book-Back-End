import { getRepository, Repository } from 'typeorm';

import IGoalMonthRepository from '../../../repositories/IGoalMonthRepository';
import ICreateGoalMonthDTO from '../../../dtos/ICreateGoalMonthDTO';
import GoalMonth from '../entities/GoalMonth';

class GoalRepository implements IGoalMonthRepository {
  private goalMonthRepositoryClient: Repository<GoalMonth>;

  constructor() {
    this.goalMonthRepositoryClient = getRepository(GoalMonth);
  }

  public async create(data: ICreateGoalMonthDTO): Promise<GoalMonth> {
    const goalMonth = this.goalMonthRepositoryClient.create(data);

    await this.goalMonthRepositoryClient.save(goalMonth);

    return goalMonth;
  }

  public async findById(id: string): Promise<GoalMonth | undefined> {
    const goalMonth = await this.goalMonthRepositoryClient.findOne(id);

    return goalMonth;
  }

  public async findBookMonthInGoal(
    month: string,
    goal: string,
    bookId: string,
  ): Promise<GoalMonth | undefined> {
    const goalMonth = await this.goalMonthRepositoryClient.findOne({
      where: {
        month,
        goalId: goal,
        idGoogle: bookId,
      },
    });

    return goalMonth;
  }

  public async findByMonth(month: string): Promise<GoalMonth[]> {
    const books = await this.goalMonthRepositoryClient.find({
      where: {
        month,
      },
    });

    return books;
  }
}

export default GoalRepository;
