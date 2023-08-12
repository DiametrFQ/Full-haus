
import { Table, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';



@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;


}