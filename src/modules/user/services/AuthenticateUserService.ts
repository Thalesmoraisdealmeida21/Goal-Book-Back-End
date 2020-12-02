import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '@config/auth';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExistent = await this.usersRepository.findByEmail(email);

    if (!userExistent) {
      throw new AppError('This user does not exist');
    }

    const passwordMatched = bcrypt.compareSync(password, userExistent.password);

    if (!passwordMatched) {
      throw new AppError('password is wrong');
    }

    const token = jwt.sign({ email }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    return { user: userExistent, token };
  }
}
