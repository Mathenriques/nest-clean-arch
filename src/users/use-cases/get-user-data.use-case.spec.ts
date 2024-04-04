import { Test, TestingModule } from '@nestjs/testing';
import { UserInMemoryRepository } from '../repositories/in_memory/user.in-memory.repository';
import { GetUserDataUseCase } from './get-user-data.use-case';
import { SignUpUseCase } from './sign-up.use-case';
import { User } from '../entities/user.entity';

describe('Sign Up Use Case Teste', () => {
  let useCase: GetUserDataUseCase;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        GetUserDataUseCase,
        UserInMemoryRepository,
        {
          provide: 'IUserRepository',
          useExisting: UserInMemoryRepository,
        },
      ],
    }).compile();

    // Criando usuário
    const signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    user = await signUpUseCase.execute({
      name: 'Matheus Henriques',
      email: 'teste@example.com',
    });

    useCase = module.get<GetUserDataUseCase>(GetUserDataUseCase);
  });

  it('Should be able to get user data', async () => {
    const { email, name } = await useCase.execute(user.id);

    expect(name).toBe(user.name);
    expect(email).toBe(user.email);
  });

  it('Should not be able to get user data', async () => {
    expect(() => {
      return useCase.execute('1234');
    }).rejects.toBeInstanceOf(Error);
  });
});
