import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Controller('users')
export class UserController {
  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Post()
  signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }
}
