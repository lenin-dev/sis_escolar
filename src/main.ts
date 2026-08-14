import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import morgan from 'morgan';
import { AllExceptionsFilter } from './common/filters/catch.error.filtro.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    app.use(morgan('combined')); // <-- LOGS DE PETICIONES HTTP
    app.useGlobalFilters(new AllExceptionsFilter()); // <-- CAPTURA ERRORES GLOBALES

    const config = new DocumentBuilder()
        .setTitle('Documentación api escolar')
        // .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentacion', app, documentFactory);

    await app.listen(process.env.PORT ?? 3006, '0.0.0.0', () => {
        console.log(`Server escuchando en el puerto ${process.env.PORT ?? 3006}`);
    });
}
bootstrap();
