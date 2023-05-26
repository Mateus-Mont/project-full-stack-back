import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';
import { contacts } from 'src/database/db';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.create(createContactDto);
  }

  findAll() {
    return contacts;
  }

  // findOne(id: string) {
  //   return this.contactsRepository.
  // }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: string) {
    return this.contactsRepository.delete(id);
  }
}
