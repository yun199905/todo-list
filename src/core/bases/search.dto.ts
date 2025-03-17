import { IsInt, IsOptional, Min } from 'class-validator';

export class SearchDto {
  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number;
}
