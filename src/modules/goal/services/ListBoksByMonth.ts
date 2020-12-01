import { inject, injectable } from 'tsyringe';
import GoalMonth from '../infra/typeorm/entities/GoalMonth';
import IGoalMonthRepository from '../repositories/IGoalMonthRepository';

@injectable()
class AddBookInMonthGoalService {
  constructor(
    @inject('GoalMonthRepository')
    private goalsMonthRepository: IGoalMonthRepository,
  ) {}

  public async execute(month: string): Promise<GoalMonth[]> {
    const books = await this.goalsMonthRepository.findByMonth(month);

    return books;
  }
}

export default AddBookInMonthGoalService;
