import { AppModule } from '@modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('API проекта')
    .setDescription('Документация API для проекта')
    .setVersion('1.0')
    .addBearerAuth() // Для добавления авторизации через Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
