import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { usuarios } from './../src/usuarios/Temporal';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    usuarios.length = 0;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('supports all user routes and returns the correct HTTP headers', async () => {
    const created = await request(app.getHttpServer())
      .post('/usuarios')
      .send({ nombre: 'Ana', edad: 25 })
      .expect(201);
    const id = created.body.id;

    await request(app.getHttpServer())
      .get('/usuarios')
      .expect(200)
      .expect([{ id, nombre: 'Ana', edad: 25 }]);
    await request(app.getHttpServer())
      .get(`/usuarios/${id}`)
      .expect(200)
      .expect({ id, nombre: 'Ana', edad: 25 });
    await request(app.getHttpServer())
      .head('/usuarios')
      .expect(200)
      .expect('X-Total-Usuarios', '1')
      .expect('X-API-Estado', 'Funcionando')
      .expect((response) => expect(response.text ?? '').toBe(''));
    await request(app.getHttpServer())
      .head(`/usuarios/${id}`)
      .expect(200)
      .expect((response) => expect(response.text ?? '').toBe(''));
    await request(app.getHttpServer())
      .options('/usuarios')
      .expect(204)
      .expect('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    await request(app.getHttpServer())
      .options(`/usuarios/${id}`)
      .expect(204)
      .expect('Allow', 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS');

    await request(app.getHttpServer())
      .patch(`/usuarios/${id}`)
      .send({ edad: 26 })
      .expect(200)
      .expect({ id, nombre: 'Ana', edad: 26 });
    await request(app.getHttpServer())
      .put(`/usuarios/${id}`)
      .send({ nombre: 'Eva', edad: 20 })
      .expect(200)
      .expect({ id, nombre: 'Eva', edad: 20 });
    await request(app.getHttpServer())
      .delete(`/usuarios/${id}`)
      .expect(200)
      .expect({ id, nombre: 'Eva', edad: 20 });
    await request(app.getHttpServer()).get(`/usuarios/${id}`).expect(404);
  });

  it('validates required fields for POST and PUT', async () => {
    await request(app.getHttpServer())
      .post('/usuarios')
      .send({ nombre: 'Ana' })
      .expect(400);
    await request(app.getHttpServer())
      .put('/usuarios/1')
      .send({ nombre: 'Ana' })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
