import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pokemons')
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number;

  @Column()
  name: string;

  @Column()
  typeFirst: string;

  @Column({ nullable: true })
  typeSecond: string;

  @Column()
  total: number;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  spAttack: number;

  @Column()
  spDefense: number;

  @Column()
  speed: number;

  @Column()
  generation: number;

  @Column({ default: false })
  legendary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}