import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsuariosService {

    constructor(private readonly prismaService: PrismaService) {}

    async getAllUsuarios() {
        return this.prismaService.usuario.findMany();
    }

    async getUsuarioById(id_usuario: string) {
        return this.prismaService.usuario.findUnique({
            where: { id_usuario },
        });
    }

    async createUsuario(data: any) {
        const fechahoy = new Date();
        data.fecha_creacion = fechahoy;
        return this.prismaService.usuario.create({
            data,
        });
    }

    async updateUsuario(id_usuario: string, data: any) {
        return this.prismaService.usuario.update({
            where: { id_usuario },
            data,
        });
    }

    async deleteUsuario(id_usuario: string) {
        return this.prismaService.usuario.delete({
            where: { id_usuario },
        });
    }

}
