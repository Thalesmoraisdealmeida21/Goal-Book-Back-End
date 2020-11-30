// import AppError from '@shared/errors/AppError';
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

  public async execute(): Promise<Goal[]> {
    const goals = await this.goalRepository.findAll();

    return goals;
  }
}
