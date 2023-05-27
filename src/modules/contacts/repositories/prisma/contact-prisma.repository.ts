import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contact.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, userId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
      userId: userId,
    });
    const newContact = await this.prisma.contacts.create({
      data: {
        id: contact.id,
        email: contact.email,
        tel: contact.tel,
        name: contact.name,
        created_at: contact.created_at,
        userId,
      },
    });

    return newContact;
  }
  // async findByEmail(email: string): Promise<Contact> {
  //   const userContact = await this.prisma.contacts.create();
  //   return plainToInstance(Contact, userContact);
  // }
  async findAll(): Promise<Contact[]> {
    const contacts = await this.prisma.contacts.findMany({
      include: { user: true },
    });
    return contacts;
  }
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contacts.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    return plainToInstance(Contact, contact);
  }

  // async findUserId(user_id: string): Promise<Contact> {
  //   const contact = await this.prisma.contacts.findUnique({
  //     where: { user_id },
  //   });
  //   return plainToInstance(Contact, contact);
  // }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contacts.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Contact, contact);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.contacts.delete({
      where: { id },
    });
  }
}
