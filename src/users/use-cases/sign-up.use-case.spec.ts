import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.in-memory.repository';
import * as bcrypt from 'bcrypt';

describe('Sign Up Use Case Teste', () => {
  let useCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  it('Should be able to create an use', async () => {
    const userData = {
      name: 'Matheus Henriques',
      email: 'teste@example.com',
      password: '1234567',
    };

    const { email, name, password_hash } = await useCase.execute(userData);
    const checkPasswordHash = await bcrypt.compare(
      userData.password,
      password_hash,
    );

    expect(name).toBe(userData.name);
    expect(email).toBe(userData.email);

    console.log(checkPasswordHash);
    expect(checkPasswordHash).toEqual(true);
  });
});
