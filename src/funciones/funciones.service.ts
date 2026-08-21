import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EditarFuncionDto } from './dto/update-funciones.dto.js';
import { CrearFuncionDto } from './dto/create-funciones.tdo.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';

@Injectable()
export class FuncionesService {

    constructor(private readonly prismaService: PrismaService) {}

    async getAllFunciones(querys: QuerysObligatoriasDto) {
        const { limite, pagina, ordenar, campo_ordenar } = querys;
        const skip = (pagina - 1) * limite;

        const result = await this.prismaService.funciones.findMany({
            take: limite,
            skip,
            orderBy: {
                [campo_ordenar]: ordenar.toLowerCase() as 'asc' | 'desc',
            },
        });
        if(result.length === 0) {
            throw new NotFoundException('No hay datos que mostrar');
        }
        
        return result;
    }

    async getOneFuncion(idfuncion: number) {
        const result = await this.prismaService.funciones.findFirst({
            where: { id_funcion: idfuncion }
        });
        if(!result) { throw new NotFoundException('funcion no encontrada') }

        return result;
    }

    async createFunciones(datos: CrearFuncionDto) {
        const result = await this.prismaService.funciones.create({
            data: {
                ...datos,
                fecha_creacion: datos.fecha_creacion ?? new Date(),
            },
        });

        return result;
    }

    async editFunciones(idfuncion: number, datos: EditarFuncionDto) {
        if(!datos) { throw new NotFoundException('Información vacia para editar') }
        await this.getOneFuncion(idfuncion);

        const result = await this.prismaService.funciones.update({
            where: { id_funcion: idfuncion },
            data: datos
        });

        return result;
    }

    async deletefuncion(idfuncion: number) {
        await this.getOneFuncion(idfuncion);
        return await this.prismaService.funciones.delete({
            where: { id_funcion: idfuncion }
        });
    }

}
