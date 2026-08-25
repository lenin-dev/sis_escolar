import { Controller, Get, Post, Put, Delete, Req, Res, Param, Body, Query } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UsuariosService } from './usuarios.service.js';
import { UsuariosFuncinesService } from './usuarios.funcines.service.js';
import { CrearUsuario } from './dto/create-usuarios.dto.js';
import { EditarUsuario } from './dto/update-usuarios.dto.js';
import { UsuarioFuncionDto } from './dto/usuario-funciones.tdo.js';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuariosController {

    constructor(
        private readonly usuariosService: UsuariosService, 
        private readonly usuarioFuncionService: UsuariosFuncinesService
    ) {}

    @Get()
    async getAllUsuarios(@Req() req: Request, @Res() res: Response, @Query() querys: QuerysObligatoriasDto) {
        const usuarios = await this.usuariosService.getAllUsuarios(querys);
        res.json(usuarios);
    }

    @Get('/:id_usuario')
    @ApiParam({ name: 'id_usuario', description: 'id del usuario', example: 'JB4KJRGH-DFGHDG-DFG-DFGDFG-D' })
    async getOneUsuarios(@Param('id_usuario') id_usuario: string, @Res() res: Response, @Query() querys: QuerysObligatoriasDto) {
        const usuario = await this.usuariosService.getOneUsuario(id_usuario, querys);
        res.json(usuario);
    }

    @Post()
    async createUsuario(@Body() body: CrearUsuario, @Res() res: Response) {
        const usuario = await this.usuariosService.createUsuario(body);
        res.json({
            message: "Usuario creado correctamente",
            data: usuario
        });
    }

    @Put('/:id_usuario')
    @ApiParam({ name: 'id_usuario', description: 'id del usuario', example: 'JB4KJRGH-DFGHDG-DFG-DFGDFG-D' })
    async updateUsuario(@Param('id_usuario') id_usuario: string, @Body() body: EditarUsuario, @Res() res: Response) {
        const usuario = await this.usuariosService.updateUsuario(id_usuario, body);
        res.json({
            message: "Usuario editado correctamente",
            data: usuario
        });
    }

    @Delete('/:id_usuario')
    @ApiParam({ name: 'id_usuario', description: 'id del usuario', example: 1 })
    async deleteUsuario(@Param('id_usuario') id_usuario: string, @Res() res: Response) {
        const usuario = await this.usuariosService.deleteUsuario(id_usuario);
        res.json({
            message: "Usuario eliminado correctamente",
            data: usuario
        });
    }

    // ********************************************************* FUNCIONES ****************************************************************

    @Get('/:id_usuario/funciones')
    async getUsuarioFuncion(@Res() res: Response, @Query() querys: QuerysObligatoriasDto) {
        const result = await this.usuarioFuncionService.getAllUsuFunc(querys);
        res.json(result);
    }

    @Post('/:id_usuario/funciones')
    @ApiParam({ name: 'id_usuario', description: 'id del usuario', example: 'JB4KJRGH-DFGHDG-DFG-DFGDFG-D' })
    async postUsuarioFuncion(@Param('id_usuario') id_usuario: string, @Res() res: Response, @Body() body: UsuarioFuncionDto) {
        const result = await this.usuarioFuncionService.addUsuFunc(id_usuario, body);
        res.json({
            code: 201,
            message: 'Funcion asignada correctamente al usuario',
            data: result
        });
    }

    @Put('/:id_usu_fun/funciones')
    // @ApiParam({ name: 'id_usuario', description: 'id del usuario', example: 'JB4KJRGH-DFGHDG-DFG-DFGDFG-D' })
    // @ApiParam({ name: 'id_funcion', description: 'id de la funcion', example: 1 })
    @ApiParam({ name: 'id_usu_fun', description: 'id de usuario_funcion', example: 1 })
    async putUsuarioFuncion(@Param('id_usu_fun') id_usu_fun: number, @Res() res: Response, @Body() body: UsuarioFuncionDto) {
        const result = await this.usuarioFuncionService.putUsuFunc(id_usu_fun, body);
        res.json({
            code: 200,
            message: 'Funcion editada correctamente al usuario',
            data: result
        });
    }

    @Delete('/:id_usu_fun/funciones')
    @ApiParam({ name: 'id_usu_fun', description: 'id de usuario_funcion', example: 1 })
    async deleteUsuarioFuncion(@Param('id_usu_fun') id_usu_fun: number, @Res() res: Response) {
        const result = await this.usuarioFuncionService.deleteUsuFunc(id_usu_fun);
        res.json({
            code: 200,
            message: 'Funcion eliminada correctamente al usuario',
            data: result
        });
    }

}
