import { Router } from 'express';
import GoalController from '../controllers/GoalController';
import GoalMonthController from '../controllers/GoalMonthController';

const goalRouter = Router();

const goalController = new GoalController();
const goalMonthController = new GoalMonthController();

goalRouter.post('/', goalController.create);
goalRouter.post('/goalmonth', goalMonthController.create);
goalRouter.get('/books/:month', goalMonthController.index);
goalRouter.get('/', goalController.index);

export default goalRouter;
