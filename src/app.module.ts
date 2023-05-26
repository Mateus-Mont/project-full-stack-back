import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { UserRepository } from './modules/users/repositories/user.repository';
import { UsersInMemoryRepository } from './modules/users/repositories/memory/user.in-memory.repository';
import { UsersController } from './modules/users/users.controller';
import { ContactsRepository } from './modules/contacts/repositories/contact.repository';
import { ContactsInMemoryRepository } from './modules/contacts/repositories/memory/contact.in-memory.repository';
import { ContactsService } from './modules/contacts/contacts.service';
import { ContactsController } from './modules/contacts/contacts.controller';

@Module({
  controllers: [UsersController, ContactsController],
  providers: [
    UsersService,
    ContactsService,
    {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    },
    {
      provide: ContactsRepository,
      useClass: ContactsInMemoryRepository,
    },
  ],
})
export class AppModule {}
