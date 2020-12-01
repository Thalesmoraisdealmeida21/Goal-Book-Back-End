import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddBookInMonthGoalService from '../../../services/AddBookInMonthGoalService';
import ListBoksByMonth from '../../../services/ListBoksByMonth';

export default class GoalMonthController {
  public async create(request: Request, reponse: Response): Promise<Response> {
    const { title, pages, image, idGoogle, month, goal } = request.body;

    const createGoalMonth = container.resolve(AddBookInMonthGoalService);

    const goalMonth = await createGoalMonth.execute({
      title,
      pages,
      image,
      idGoogle,
      month,
      goalId: goal,
    });

    return reponse.status(201).json(goalMonth);
  }

  public async index(request: Request, reponse: Response): Promise<Response> {
    const { month } = request.params;

    const listBoksByMonth = container.resolve(ListBoksByMonth);

    const goalMonth = await listBoksByMonth.execute(month);

    return reponse.status(201).json(goalMonth);
  }
}
