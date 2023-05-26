import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  name: string;
  email: string;
  tel: string;
  constructor() {
    this.id = randomUUID();
  }
}