import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}
  async create(createContactDto: CreateContactDto) {
    // const user_id = await this.contactsRepository.findOne(
    //   createContactDto.user_id,
    // );
    // console.log(user_id);
    // if (!user_id) {
    //   throw new NotFoundException('User not found');
    // }
    try {
      return await this.contactsRepository.create(createContactDto);
    } catch (error) {
      if (createContactDto.email) {
        throw new ConflictException('E-mail already registered');
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    const contact = await this.contactsRepository.findByEmail(email);
    return contact;
  }

  // async findOneUserId(user_id: string) {
  //   const contact = await this.contactsRepository.findUserId(user_id);
  //   if (!contact) {
  //     throw new NotFoundException('Contact not Found');
  //   }
  //   return contact;
  // }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne(id);
    if (!contact) {
      throw new NotFoundException('Contact not Found');
    }
    return contact;
  }
  async findAll() {
    return;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne(id);

    if (!contact) {
      throw new NotFoundException('contact not found');
    }

    try {
      return await this.contactsRepository.update(id, updateContactDto);
    } catch (error) {
      if (updateContactDto.email) {
        throw new ConflictException('Contact already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    const contactId = await this.contactsRepository.findOne(id);
    if (!contactId) {
      throw new NotFoundException('Contact not found');
    }
    return await this.contactsRepository.delete(id);
  }
}
