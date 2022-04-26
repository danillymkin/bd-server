import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../src/auth/guards/roles.guard';

describe('UsersController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(true)
      .overrideGuard(RolesGuard)
      .useValue(true)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should register a new user and return 201', () => {
    const URL = '/api/auth/register';
    return request(app.getHttpServer())
      .post(URL)
      .send({
        email: 'alex@alex.ru',
        password: 'alex',
        firstName: 'Alex',
        lastName: 'Smite',
      } as RegisterUserDto)
      .expect(201);
  });

  it('should get an user and return 200', () => {
    return request(app.getHttpServer()).get('/api/users/1').expect(200);
  });
});
