import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  tel: string;
  user_id?: string;
  created_at: Date;
  constructor() {
    this.id = randomUUID();
  }
}
