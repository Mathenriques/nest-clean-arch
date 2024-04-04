import { Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/IUserRepository';

export class GetUserDataUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      throw new Error('User not exists!');
    }

    return user;
  }
}
