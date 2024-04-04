import { Inject } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../repositories/IUserRepository';

export class SignUpUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: SignUpDto) {
    const user = new User(input);
    await this.userRepo.create(user);
    return user;
  }
}
