import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { usuarios } from './Temporal';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    usuarios.length = 0;
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uses stable unique IDs when users are removed', () => {
    const primero = service.create({ nombre: 'Ana', edad: 25 });
    const segundo = service.create({ nombre: 'Luis', edad: 30 });

    service.remove(primero.id);
    expect(service.findOne(segundo.id)).toBe(segundo);

    const tercero = service.create({ nombre: 'Eva', edad: 20 });
    expect(tercero.id).toBeGreaterThan(segundo.id);
    expect(service.findAll()).toEqual([segundo, tercero]);
  });

  it('replaces all editable fields and patches only provided fields', () => {
    const usuario = service.create({ nombre: 'Ana', edad: 25 });

    expect(service.update(usuario.id, { edad: 26 })).toEqual({
      id: usuario.id,
      nombre: 'Ana',
      edad: 26,
    });
    expect(service.replace(usuario.id, { nombre: 'Eva', edad: 20 })).toEqual({
      id: usuario.id,
      nombre: 'Eva',
      edad: 20,
    });
  });

  it('throws 404 when a requested user does not exist', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
    expect(() => service.replace(999, { nombre: 'Eva', edad: 20 })).toThrow(
      NotFoundException,
    );
    expect(() => service.update(999, { edad: 20 })).toThrow(NotFoundException);
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
