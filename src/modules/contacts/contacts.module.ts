import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsRepository } from './repositories/contact.repository';
import { ContactsInMemoryRepository } from './repositories/memory/contact.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ContactPrismaRepository } from './repositories/prisma/contact-prisma.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    {
      provide: ContactsRepository,
      useClass: ContactPrismaRepository,
    },
  ],
})
export class ContactsModule {}
