import ICreateGoalDTO from '../dtos/ICreateGoalDTO';
import Goal from '../infra/typeorm/entities/Goal';

export default interface IGoalRepository {
  create(goal: ICreateGoalDTO): Promise<Goal>;
  findByYear(month: string): Promise<Goal | undefined>;
  findAll(): Promise<Goal[]>;
  findById(id: string): Promise<Goal | undefined>;
}
