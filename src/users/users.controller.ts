import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { GetUserDataUseCase } from './use-cases/get-user-data.use-case';

@Controller('users')
export class UserController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Inject(GetUserDataUseCase)
  private readonly getUserDataUseCase: GetUserDataUseCase;

  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return this.getUserDataUseCase.execute(id);
  }
}
