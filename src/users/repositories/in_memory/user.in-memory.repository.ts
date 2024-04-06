import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from '../IUserRepository';

export class UserInMemoryRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: User): Promise<void> {
    data.id = crypto.randomUUID();
    this.items.push(data);
  }

  async getUserById(id: string): Promise<User> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
