import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { UserTypeOrmRepository } from './repositories/typeorm/user.repository';
import { GetUserDataUseCase } from './use-cases/get-user-data.use-case';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    SignUpUseCase,
    GetUserDataUseCase,
    ValidateUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  exports: [
    TypeOrmModule.forFeature([User]),
    ValidateUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}
