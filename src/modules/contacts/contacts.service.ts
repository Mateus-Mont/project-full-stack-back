import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  async create(createContactDto: CreateContactDto, userId: string) {
    return await this.contactsRepository.create(createContactDto, userId);
  }

  async findByEmail(email: string) {
    const contact = await this.contactsRepository.findByEmail(email);
    return contact;
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne(id);
    if (!contact) {
      throw new NotFoundException('Contact not Found');
    }
    return contact;
  }
  async findAll() {
    return await this.contactsRepository.findAll();
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException('contact not found');
    }

    return await this.contactsRepository.update(id, updateContactDto);
  }

  async remove(id: string) {
    const contactId = await this.contactsRepository.findOne(id);
    if (!contactId) {
      throw new NotFoundException('Contact not found');
    }
    return await this.contactsRepository.delete(id);
  }
}
