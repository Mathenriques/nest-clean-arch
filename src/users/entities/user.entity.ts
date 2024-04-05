import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; //uuid

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  constructor(
    props: { name: string; email: string; password_hash: string },
    id?: string,
  ) {
    Object.assign(this, props), (this.id = id ?? randomUUID());
  }
}
