import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { CustomResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );

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
