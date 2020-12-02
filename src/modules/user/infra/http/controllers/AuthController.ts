import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthenticateUserService);

    const authInfo = await authUser.execute({
      email,
      password,
    });

    return response.status(200).json(authInfo);
  }
}
