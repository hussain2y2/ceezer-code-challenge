import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { Body, Controller, Get, NotFoundException, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';

@ApiBearerAuth()
@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.pokemonService.findAll(paginationQuery);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const pokemon: Pokemon | null = await this.pokemonService.findById(id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id: ${id} does not exists`);
    }
    return pokemon;
  }

  @Get('damage/:attackerId/:defenderId')
  async getDamage(@Param('attackerId') attackerId: string, @Param('defenderId') defenderIdid: string) {
    return this.pokemonService.getDamage(attackerId, defenderIdid);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonService.update(id, updatePokemonDto);
  }
}