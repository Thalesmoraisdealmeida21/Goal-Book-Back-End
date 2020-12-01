import { getRepository, Repository } from 'typeorm';

import IGoalRepository from '../../../repositories/IGoalRepository';
import ICreateGoalDTO from '../../../dtos/ICreateGoalDTO';
import Goal from '../entities/Goal';

class GoalRepository implements IGoalRepository {
  private goalRepositoryClient: Repository<Goal>;

  constructor() {
    this.goalRepositoryClient = getRepository(Goal);
  }

  public async create(data: ICreateGoalDTO): Promise<Goal> {
    const goal = this.goalRepositoryClient.create({
      booksToRead: data.booksToRead,
      year: data.year,
    });

    await this.goalRepositoryClient.save(goal);

    return goal;
  }

  public async findByYear(year: string): Promise<Goal | undefined> {
    const goal = await this.goalRepositoryClient.findOne({
      where: {
        year,
      },
    });

    return goal;
  }

  public async findAll(): Promise<Goal[]> {
    const goals = await this.goalRepositoryClient.find();

    return goals;
  }

  public async findById(id: string): Promise<Goal | undefined> {
    const goal = await this.goalRepositoryClient.findOne({
      where: {
        id,
      },
    });

    return goal;
  }
}

export default GoalRepository;
