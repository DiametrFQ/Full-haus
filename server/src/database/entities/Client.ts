import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './Chat';
import { Friend } from './Friend';

//@Index("client_pkey", ["id"], { unique: true })
@Entity('client', { schema: 'public' })
export class Client {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 64 })
  name: string;

  @Column('integer', { name: 'friend_count', default: () => '0' })
  friendCount: number;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column('character varying', { name: 'phone', length: 10 })
  phone: string;

  @Column('character varying', { name: 'email', default: () => "''" })
  email: string;

  @OneToMany(() => Chat, (chat) => chat.idCreator)
  chats: Chat[];

  @OneToMany(() => Friend, (friend) => friend.client)
  friends: Friend[];

  @OneToMany(() => Friend, (friend) => friend.friend)
  friends2: Friend[];
}
