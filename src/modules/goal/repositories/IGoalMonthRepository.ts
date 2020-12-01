import ICreateGoalMonthDTO from '../dtos/ICreateGoalMonthDTO';
import GoalMonth from '../infra/typeorm/entities/GoalMonth';

export default interface IGoalMonthRepository {
  create(goal: ICreateGoalMonthDTO): Promise<GoalMonth>;
  findById(id: string): Promise<GoalMonth | undefined>;
  findByMonth(month: string): Promise<GoalMonth[]>;
  findBookMonthInGoal(
    month: string,
    goal: string,
    bookId: string,
  ): Promise<GoalMonth | undefined>;
}
