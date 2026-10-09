import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  @Min(0)
  edad!: number;
}
