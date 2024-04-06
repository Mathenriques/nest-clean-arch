import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<void>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
