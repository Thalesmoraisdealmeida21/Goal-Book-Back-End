import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IGoalRepository from '../repositories/IGoalRepository';
import Goal from '../infra/typeorm/entities/Goal';

interface IRequest {
  year: string;
  booksToRead: string;
}

@injectable()
export default class CreateGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalRepository: IGoalRepository,
  ) {}

  public async execute({ booksToRead, year }: IRequest): Promise<Goal> {
    const goalExists = await this.goalRepository.findByYear(year);

    if (goalExists) {
      throw new AppError('this goal already exists for this year');
    }

    const goal = await this.goalRepository.create({
      booksToRead,
      year,
    });

    return goal;
  }
}
