import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  created_at: string;
  constructor() {
    this.id = randomUUID();
  }
}
