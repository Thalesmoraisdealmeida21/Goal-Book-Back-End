import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGoalService from '../../../services/CreateGoalService';
import ListGoalsService from '../../../services/ListGoalsService';

export default class GoalController {
  public async create(request: Request, reponse: Response): Promise<Response> {
    const { year, booksToRead } = request.body;

    const createGoal = container.resolve(CreateGoalService);

    const goal = await createGoal.execute({
      booksToRead,
      year,
    });

    return reponse.status(201).json(goal);
  }

  public async index(request: Request, reponse: Response): Promise<Response> {
    const listGoals = container.resolve(ListGoalsService);

    const goal = await listGoals.execute();

    return reponse.status(201).json(goal);
  }
}
