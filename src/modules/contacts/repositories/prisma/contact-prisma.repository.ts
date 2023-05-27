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
  async create(data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, {
      ...data,
    });
    const newContact = await this.prisma.contacts.create({
      data: {
        id: contact.id,
        email: contact.email,
        tel: contact.tel,
        name: contact.name,
        user_id: contact.user_id,
        created_at: contact.created_at,
      },
    });

    return newContact;
  }
  async findByEmail(email: string): Promise<Contact> {
    const userContact = await this.prisma.contacts.findUnique({
      where: { email },
    });
    return plainToInstance(Contact, userContact);
  }
  async findAll(): Promise<Contact[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contacts.findUnique({
      where: { id },
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
