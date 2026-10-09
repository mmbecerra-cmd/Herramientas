import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator';

export class UpdateUsuarioDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  edad?: number;
}
