import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client';

//@Index("chat_pkey", ["id"], { unique: true })
@Entity('chat', { schema: 'public' })
export class Chat {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('int4', {
    name: '_id_users',
    nullable: true,
    array: true,
    default: () => 'ARRAY[]::integer[]',
  })
  idUsers: number[] | null;

  @Column('text', {
    name: '_messages',
    nullable: true,
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  messages: string[] | null;

  @ManyToOne(() => Client, (client) => client.chats)
  @JoinColumn([{ name: 'id_creator', referencedColumnName: 'id' }])
  idCreator: Client;
}
