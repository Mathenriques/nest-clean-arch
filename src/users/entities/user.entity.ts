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

  constructor(props: { name: string; email: string }, id?: string) {
    Object.assign(this, props), (this.id = id ?? randomUUID());
  }
}
