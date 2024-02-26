import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity('friend', { schema: 'public' })
export class Friend {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Client, (client) => client.friends)
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: Client;

  @ManyToOne(() => Client, (client) => client.friends2)
  @JoinColumn([{ name: 'friend_id', referencedColumnName: 'id' }])
  friend: Client;
}
