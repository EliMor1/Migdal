/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);
    dotenv.config();
    const PORT = process.env.PORT || 3001;
    const cors = process.env.CORS_URI;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: cors,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    app.setGlobalPrefix('/api');
    app.listen(PORT).then(() =>
        logger.log(bootstrap.name, `listening on port ${PORT} ...`),
    );
}
bootstrap();
