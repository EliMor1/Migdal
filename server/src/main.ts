import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);
    
    // .env file configurations.
    dotenv.config();
    const PORT = process.env.PORT || 3001;
    const cors = process.env.CORS_URI;
    const app = await NestFactory.create(AppModule);

    // enabling only the client to send requests to my server.
    // methods allowed below.
    app.enableCors({
        origin: cors,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });

    // prefix is set to /api
    app.setGlobalPrefix('/api');
    

    // apply validation through all the project, none validated parameters won't reflect the controllers and won't be forwarded for further process to the services.
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }));

    app.listen(PORT).then(() =>
        logger.log(bootstrap.name, `listening on port ${PORT} ...`),
    );
}
bootstrap();
