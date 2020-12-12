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
      throw new AppError('Este usuário não existe');
    }

    const passwordMatched = bcrypt.compareSync(password, userExistent.password);

    if (!passwordMatched) {
      throw new AppError('A senha esta incorreta');
    }

    const token = jwt.sign({}, auth.secret, {
      subject: userExistent.id,
      expiresIn: auth.expiresIn,
    });

    return { user: userExistent, token };
  }
}
