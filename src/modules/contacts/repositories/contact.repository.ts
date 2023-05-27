import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(
    data: CreateContactDto,
    userId: string,
  ): Promise<Contact> | Contact;
  abstract findByEmail(email: string): Promise<Contact> | Contact;
  abstract findOne(id: string): Promise<Contact | undefined>;
  // abstract findUserId(user_id: string): Promise<Contact | undefined>;
  abstract findAll(): Promise<Contact[]> | Contact[];
  abstract update(
    id: string,
    data: UpdateContactDto,
  ): Promise<UpdateContactDto> | UpdateContactDto;
  abstract delete(id: string): Promise<void> | void;
}
