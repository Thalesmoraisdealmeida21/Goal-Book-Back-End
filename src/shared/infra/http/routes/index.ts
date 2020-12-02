import { Router } from 'express';

import goalRouter from '@modules/goal/infra/http/routes/goalRouter';
import userRouter from '@modules/user/infra/http/routes/user.routes';

const routes = Router();

routes.use('/goals', goalRouter);
routes.use('/users', userRouter);

export default routes;
