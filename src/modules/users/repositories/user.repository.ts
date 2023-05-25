import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findOne(id: string): Promise<User | undefined> | undefined | User;
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
  abstract delete(id: string): Promise<void> | void;
}
