import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Диллер по продаже автомобилей')
    .setDescription('Документация Rest API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cookieParser());

  app.enableCors({ credentials: true, origin: `${process.env.CLIENT_URL}` });

  const PORT = +process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Server started on ${PORT} port.`));
}
bootstrap();
