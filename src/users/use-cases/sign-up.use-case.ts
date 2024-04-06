import { Inject } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repositories/IUserRepository';
import * as bcrypt from 'bcrypt';

export class SignUpUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: SignUpDto) {
    const { name, email, password } = input;

    const password_hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password_hash });

    await this.userRepo.create(user);
    return {
      ...user,
      password_hash: undefined
    };
  }
}
