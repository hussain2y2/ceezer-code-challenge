import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Min(10)
  limit = 10;

  @IsOptional()
  @IsPositive()
  @Min(1)
  page = 1;
}