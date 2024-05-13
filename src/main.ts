import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { CustomResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Hotel Booking System API')
    .setDescription('Hotel Booking System API description')
    .setVersion('1.0')
    .addTag('Hotel Booking System')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  let port = process.env.PORT || 8000;
  await app.listen(port, () => {
    console.log('---------------------------------------');
    console.log('---------------------------------------');
    console.log(`Application is running on port ${port}`);
    console.log('---------------------------------------');
    console.log('---------------------------------------');
  });
}
bootstrap();
