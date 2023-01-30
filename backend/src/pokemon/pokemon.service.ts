import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { typeModifier } from '@/common/utils';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
  ) { }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    let offset = 0;
    if (page) {
      offset = (page - 1) * limit;
    }
    const builder = this.pokemonRepository.createQueryBuilder();
    const total: number = await builder.getCount();
    const items: Pokemon[] = await builder
      .skip(offset)
      .take(limit)
      .getMany();

    return {
      items,
      meta: {
        total,
        limit,
        offset,
        page,
      },
    };
  }

  findById(id: string): Promise<Pokemon> {
    return this.pokemonRepository.findOneBy({ id: +id });
  }

  async update(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.preload({
      id: +id,
      ...updatePokemonDto
    });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon id: ${id} not found`);
    }
    return this.pokemonRepository.save(pokemon);
  }


  async getDamage(attackerId: string, defenderId: string) {
    const attacker: Pokemon | null = await this.findById(attackerId);
    const defender: Pokemon | null = await this.findById(defenderId);
    if (!attacker || !defender) {
      throw new NotFoundException(`Attacker or Defender does not exists`);
    }

    const damage = (30 * attacker.attack / defender.defense) * typeModifier(attacker.typeFirst, defender.typeFirst);
    return {
      statusCode: 200,
      damage
    };
  }

}