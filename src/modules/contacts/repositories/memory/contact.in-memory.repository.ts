import { contacts } from 'src/database/db';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contact.repository';

export class ContactsInMemoryRepository implements ContactsRepository {
  create(data: CreateContactDto): Contact | Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
    });
    contacts.push(newContact);
    return newContact;
  }
  findAll(): Contact[] | Promise<Contact[]> {
    return contacts;
  }
  update(
    id: string,
    data: UpdateContactDto,
  ): UpdateContactDto | Promise<UpdateContactDto> {
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    contacts[contactIndex] = { ...contacts[contactIndex], ...data };
    return contacts[contactIndex];
  }
  delete(id: string): void | Promise<void> {
    const userIndex = contacts.findIndex((contact) => contact.id === id);
    contacts.splice(userIndex, 1);
  }
}
