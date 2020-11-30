import { Router } from 'express';
import GoalController from '../controllers/GoalController';

const goalRouter = Router();

const goalController = new GoalController();

goalRouter.post('/', goalController.create);
goalRouter.get('/', goalController.index);

export default goalRouter;
