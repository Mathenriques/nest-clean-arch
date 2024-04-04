import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../IUserRepository';
import { SignUpDto } from 'src/users/dtos/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  async create(data: SignUpDto): Promise<void> {
    await this.typeOrmRepository.save(data);
  }
}
