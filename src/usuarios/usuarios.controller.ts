import { Controller, Get, Post, Put, Delete, Req, Res, Param, Body } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UsuariosService } from './usuarios.service.js';

@Controller('/usuarios')
export class UsuariosController {
    
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    async getAllUsuarios(@Req() req: Request, @Res() res: Response) {
        const usuarios = await this.usuariosService.getAllUsuarios();
        res.json(usuarios);
    }

    @Get('/:id_usuario')
    async getOneUsuarios(@Param('id_usuario') id_usuario: string, @Res() res: Response) {
        const usuario = await this.usuariosService.getUsuarioById(id_usuario);
        res.json(usuario);
    }

    @Post()
    async createUsuario(@Body() body: any, @Res() res: Response) {
        const usuario = await this.usuariosService.createUsuario(body);
        res.json(usuario);
    }

    @Put('/:id_usuario')
    updateUsuario(@Param('id_usuario') id_usuario: string, @Res() res: Response) {
        return 'Actualizando un usuario existente';
    }

    @Delete('/:id_usuario')
    deleteUsuario(@Param('id_usuario') id_usuario: string, @Res() res: Response) {
        return 'Eliminando un usuario existente';
    }

}
