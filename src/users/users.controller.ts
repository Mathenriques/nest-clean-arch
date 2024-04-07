import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { GetUserDataUseCase } from './use-cases/get-user-data.use-case';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Inject(GetUserDataUseCase)
  private readonly getUserDataUseCase: GetUserDataUseCase;

  @isPublic()
  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Get('/userData')
  getUserData(@CurrentUser() user: User) {
    return this.getUserDataUseCase.execute(user.id);
  }
}
