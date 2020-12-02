import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExistent = await this.usersRepository.findByEmail(email);

    if (userExistent) {
      throw new AppError('There is already a user with this email');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordSerialized = bcrypt.hashSync(password, salt);

    const userCreated = await this.usersRepository.create({
      email,
      name,
      password: passwordSerialized,
    });

    return userCreated;
  }
}

export default CreateUserService;
