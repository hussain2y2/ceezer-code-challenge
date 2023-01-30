import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Creezer')
    .setDescription('Creezer Pokemon APIs')
    .setVersion('1.0')
    .addTag('creezer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(parseInt(process.env.PORT, 10) || 8000);
}

bootstrap();
