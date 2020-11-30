import { Router } from 'express';

import goalRouter from '@modules/goal/infra/http/routes/goalRouter';

const routes = Router();

routes.use('/goals', goalRouter);

export default routes;
