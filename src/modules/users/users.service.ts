import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      if (createUserDto.email) {
        throw new ConflictException('E-mail already exists');
      }
    }
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      if (updateUserDto.email) {
        throw new ConflictException('E-mail already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.delete(id);
  }
}
