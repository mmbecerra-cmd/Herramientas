import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  HttpCode,
  Options,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Options()
  @HttpCode(204)
  options(@Res({ passthrough: true }) response: Response): void {
    response.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  }

  @Options(':id')
  @HttpCode(204)
  optionsOne(@Res({ passthrough: true }) response: Response): void {
    response.set('Allow', 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS');
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Head()
  @HttpCode(200)
  headAll(@Res({ passthrough: true }) response: Response): void {
    response.set({
      'X-Total-Usuarios': String(this.usuariosService.findAll().length),
      'X-API-Estado': 'Funcionando',
    });
  }

  @Head(':id')
  headOne(@Param('id', ParseIntPipe) id: number): void {
    this.usuariosService.findOne(id);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  replace(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.replace(id, createUsuarioDto);
  }

  @Patch(':id')
  update(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }
}
