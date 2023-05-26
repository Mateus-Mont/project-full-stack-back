import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(data: CreateContactDto): Promise<Contact> | Contact;
  abstract findAll(): Promise<Contact[]> | Contact[];
  abstract update(
    id: string,
    data: UpdateContactDto,
  ): Promise<UpdateContactDto> | UpdateContactDto;
  abstract delete(id: string): Promise<void> | void;
}
