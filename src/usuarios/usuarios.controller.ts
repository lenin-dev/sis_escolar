import { Controller, Get, Post, Put, Delete, Req, Res, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UsuariosService } from './usuarios.service.js';
import { CrearUsuario } from './dto/create-usuarios.dto.js';
import { EditarUsuario } from './dto/update-usuarios.dto.js';


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
    @UsePipes(new ValidationPipe())
    async createUsuario(@Body() body: CrearUsuario, @Res() res: Response) {
        const usuario = await this.usuariosService.createUsuario(body);
        res.json({
            message: "Usuario creado correctamente",
            data: usuario
        });
    }

    @Put('/:id_usuario')
    @UsePipes(new ValidationPipe())
    async updateUsuario(@Param('id_usuario') id_usuario: string, @Body() body: EditarUsuario, @Res() res: Response) {
        const usuario = await this.usuariosService.updateUsuario(id_usuario, body);
        res.json({
            message: "Usuario editado correctamente",
            data: usuario
        });
    }

    @Delete('/:id_usuario')
    async deleteUsuario(@Param('id_usuario') id_usuario: string, @Res() res: Response) {
        const usuario = await this.usuariosService.deleteUsuario(id_usuario);
        res.json({
            message: "Usuario eliminado correctamente",
            data: usuario
        });
    }

}
