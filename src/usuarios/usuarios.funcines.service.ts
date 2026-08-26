import { Injectable } from '@nestjs/common';
import { UsuarioFuncionDto } from './dto/usuario-funciones.tdo.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';

@Injectable()
export class UsuariosFuncinesService {

    constructor(private readonly prismaService: PrismaService) {}

    async getAllUsuFunc(querys: QuerysObligatoriasDto) {
        const { limite, pagina, ordenar } = querys;
        const skip = (pagina - 1) * limite;

        const [total, datos] = await this.prismaService.$transaction([
            this.prismaService.usuario.count(),
            
            this.prismaService.usuario.findMany({
                include: {
                    usuario_funcion: {
                        include: {
                            idfuncion: true
                        }
                    }
                },
                take: limite,
                skip,
                orderBy: {
                    fecha_creacion: ordenar.toLowerCase() as 'asc' | 'desc',
                },
            })
        ])

        return {
            paginacion: {
                total,
                pagina,
                limite,
                total_paginas: Math.ceil(total/limite)
            },
            datos
        };
    }

    async addUsuFunc(id_usuario: string, body: UsuarioFuncionDto) {
        body.id_usuario = id_usuario;
        const resultado = await this.prismaService.usuario_Funcion.create({
            data: {
                id_usuario,
                id_funcion: body.id_funcion,
                fecha_asignacion: body.fecha_asignacion ?? new Date()
            }
        });
        return resultado;
    }

    async putUsuFunc(id_usu_fun: number, body: UsuarioFuncionDto) {
        const result = await this.prismaService.usuario_Funcion.updateMany({
            where: {
                AND: [
                    { id_usu_fun: Number(id_usu_fun) }
                ]
            },
            data: {
                id_funcion: body.id_funcion,
                fecha_asignacion: body.fecha_asignacion ?? new Date()
            }
        });
        return result;
    }

    async deleteUsuFunc(id_usu_fun: number) {
        return await this.prismaService.usuario_Funcion.delete({
            where: {
                id_usu_fun: Number(id_usu_fun)
            }
        });
    }

}
