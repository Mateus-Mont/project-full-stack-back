import { users } from 'src/database/db';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { plainToInstance } from 'class-transformer';

export class UsersInMemoryRepository implements UserRepository {
  findAll(): User[] | Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  create(data: CreateUserDto): User | Promise<User> {
    const newUser = new User();
    Object.assign(newUser, {
      ...data,
    });
    users.push(newUser);
    return plainToInstance(User, newUser);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(_email: string): User | Promise<User> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<User> | User {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return user;
    }
    return plainToInstance(User, user);
  }
  update(id: string, data: UpdateUserDto): User | Promise<User> {
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    return plainToInstance(User, users[userIndex]);
  }
  delete(id: string): void | Promise<void> {
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
  }
}
