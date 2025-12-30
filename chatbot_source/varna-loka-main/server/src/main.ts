import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Enable CORS for frontend communication
  await app.listen(process.env.PORT ?? 3001); // Run on port 3001 to avoid conflict
}
bootstrap();
