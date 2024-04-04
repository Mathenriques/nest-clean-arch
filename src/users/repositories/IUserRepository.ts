import { SignUpDto } from '../dtos/sign-up.dto';

export interface IUserRepository {
  create(data: SignUpDto): Promise<void>;
}
