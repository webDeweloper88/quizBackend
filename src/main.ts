import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  // Получение разрешенного источника из переменных окружения
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  // Включение CORS с настройками
  app.enableCors({
    origin: frontendUrl, // Разрешенные источники (например, фронтенд на Vue или React)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
    credentials: true, // Поддержка передачи cookie и авторизационных заголовков
    allowedHeaders: 'Content-Type, Accept, Authorization', // Разрешенные заголовки
    exposedHeaders: 'Authorization', // Заголовки, которые могут быть доступны клиенту
  });

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('API проекта')
    .setDescription('Документация API для проекта')
    .setVersion('1.0')
    .addBearerAuth() // Для добавления авторизации через Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = configService.get('app.port');
  await app.listen(port);
}
bootstrap();
