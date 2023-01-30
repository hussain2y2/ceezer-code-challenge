import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsOptional()
  pokemonId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  typeFirst: string;

  @IsString()
  @IsOptional()
  typeSecond: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  hp: number;

  @IsNumber()
  @IsNotEmpty()
  attack: number;

  @IsNumber()
  @IsNotEmpty()
  defense: number;

  @IsNumber()
  @IsNotEmpty()
  spAttack: number;

  @IsNumber()
  @IsNotEmpty()
  spDefense: number;

  @IsNumber()
  @IsNotEmpty()
  speed: number;

  @IsNumber()
  @IsNotEmpty()
  generation: number;

  @IsBoolean()
  @IsNotEmpty()
  legendary: boolean;
}