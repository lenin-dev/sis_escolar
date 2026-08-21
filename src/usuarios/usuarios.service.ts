import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, comparePasswords } from '../common/crypt/hash.crypt.js';
import { CrearUsuario } from './dto/create-usuarios.dto.js';
import { EditarUsuario } from './dto/update-usuarios.dto.js';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';

@Injectable()
export class UsuariosService {

    constructor(private readonly prismaService: PrismaService) {}

    async getAllUsuarios(querys: QuerysObligatoriasDto) {
        const { limite, pagina, ordenar, campo_ordenar } = querys;
        const skip = (pagina - 1) * limite;

        const result = await this.prismaService.usuario.findMany({
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

    async getOneUsuario(id_usuario: string) {
        const data = await this.prismaService.usuario.findFirst({
            where: { 
                OR: [
                    { id_usuario: id_usuario }, 
                    { usuario: { contains: id_usuario } }, 
                    { nombre_completo: { contains: id_usuario } } 
                ]
            },
        })
        if(!data) {
           throw new NotFoundException('Usuario no encontrado');
        }
        return data;
    }

    async createUsuario(data: CrearUsuario) {
        const fechahoy = new Date();
        const usuarioData: any = { ...data, fecha_creacion: fechahoy };
        usuarioData.contrasena = await hashPassword(usuarioData.contrasena);

        return await this.prismaService.usuario.create({
            data: usuarioData,
        });
    }

    async updateUsuario(id_usuario: string, data: EditarUsuario) {
        if(!data) {
            throw new NotFoundException('Información vacia para editar')
        }
        await this.getOneUsuario(id_usuario);
        const usuarioData: any = { ...data };
        if (usuarioData.contrasena) {
            usuarioData.contrasena = await hashPassword(usuarioData.contrasena);
        }
        return await this.prismaService.usuario.update({
            where: { id_usuario },
            data: usuarioData,
        });
    }

    async deleteUsuario(id_usuario: string) {
        await this.getOneUsuario(id_usuario);
        return await this.prismaService.usuario.delete({
            where: { id_usuario: id_usuario },
        });
    }

}
