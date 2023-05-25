import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { UserRepository } from './modules/users/repositories/user.repository';
import { UsersInMemoryRepository } from './modules/users/repositories/memory/user.in-memory.repository';
import { UsersController } from './modules/users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    },
  ],
})
export class AppModule {}
