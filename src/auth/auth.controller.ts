import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest.model';
import { LoginUseCase } from './use-cases/login.use-case';

@Controller()
export class AuthController {
  @Inject(LoginUseCase)
  private readonly loginUseCase: LoginUseCase;

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.loginUseCase.execute(req.user);
  }
}
