import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { generarSiguienteId, Temporal, usuarios } from './Temporal';

@Injectable()
export class UsuariosService {
  private localizarPosicion(idBuscado: number): number {
    for (let posicion = 0; posicion < usuarios.length; posicion++) {
      const usuarioActual = usuarios[posicion];
      if (usuarioActual.id === idBuscado) {
        return posicion;
      }
    }
    return -1;
  }

  private obtenerUsuario(idBuscado: number): Temporal | undefined {
    for (const usuarioActual of usuarios) {
      if (usuarioActual.id === idBuscado) {
        return usuarioActual;
      }
    }
    return undefined;
  }

  create(createUsuarioDto: CreateUsuarioDto): Temporal {
    const nuevoUsuario = new Temporal(
      generarSiguienteId(),
      createUsuarioDto.nombre,
      createUsuarioDto.edad,
    );
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  findAll(): Temporal[] {
    const listaCompleta: Temporal[] = [];
    for (const usuarioActual of usuarios) {
      listaCompleta.push(usuarioActual);
    }
    return listaCompleta;
  }

  findOne(id: number): Temporal {
    const usuarioEncontrado = this.obtenerUsuario(id);
    if (usuarioEncontrado === undefined) {
      throw new NotFoundException(`No existe un usuario con el ID ${id}`);
    }
    return usuarioEncontrado;
  }

  replace(id: number, createUsuarioDto: CreateUsuarioDto): Temporal {
    const posicion = this.localizarPosicion(id);
    if (posicion === -1) {
      throw new NotFoundException(`No existe un usuario con el ID ${id}`);
    }

    const usuarioReemplazado = new Temporal(
      id,
      createUsuarioDto.nombre,
      createUsuarioDto.edad,
    );
    usuarios[posicion] = usuarioReemplazado;
    return usuarioReemplazado;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto): Temporal {
    const usuarioExistente = this.findOne(id);
    if (updateUsuarioDto.nombre !== undefined) {
      usuarioExistente.nombre = updateUsuarioDto.nombre;
    }
    if (updateUsuarioDto.edad !== undefined) {
      usuarioExistente.edad = updateUsuarioDto.edad;
    }
    return usuarioExistente;
  }

  remove(id: number): Temporal {
    const posicion = this.localizarPosicion(id);
    if (posicion === -1) {
      throw new NotFoundException(`No existe un usuario con el ID ${id}`);
    }
    const [usuarioEliminado] = usuarios.splice(posicion, 1);
    return usuarioEliminado;
  }
}
