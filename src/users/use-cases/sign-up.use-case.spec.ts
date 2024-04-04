import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './sign-up.use-case';
import { UserInMemoryRepository } from '../repositories/in_memory/user.in-memory.repository';

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
    };

    const { email, name } = await useCase.execute(userData);

    expect(name).toBe(userData.name);
    expect(email).toBe(userData.email);
  });
});
