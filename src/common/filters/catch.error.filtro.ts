// src/common/filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | object = 'Error interno del servidor';

        if (exception instanceof HttpException) {
            status = exception.getStatus();

            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === 'object' &&
                exceptionResponse !== null &&
                'message' in exceptionResponse
            ) {
                message = (
                    exceptionResponse as {
                        message: string | object;
                    }
                ).message;
            }
        } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            status = HttpStatus.BAD_REQUEST;

            switch (exception.code) {
                case 'P2002':
                    message = `Ya existe un registro con ese valor: ${exception.meta?.target}`;
                    break;
                case 'P2025':
                    status = HttpStatus.NOT_FOUND;
                    message = 'Registro no encontrado';
                    break;
                case 'P2003':
                    message = 'Violación de llave foránea (relación inválida)';
                    break;
                default:
                    message = `Error de base de datos (código ${exception.code})`;
            }
        } else if (exception instanceof Prisma.PrismaClientValidationError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Datos o parámetros inválidos en la consulta a la base de datos';
        } else if (exception instanceof Prisma.PrismaClientInitializationError) {
            status = HttpStatus.SERVICE_UNAVAILABLE;
            message = 'No se pudo conectar a la base de datos';
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error(
            `${request.method} ${request.url} - ${JSON.stringify(message)}`,
            exception instanceof Error ? exception.stack : undefined,
        );

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}