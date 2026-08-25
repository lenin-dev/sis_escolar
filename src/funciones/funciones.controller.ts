import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { FuncionesService } from './funciones.service.js';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';
import { CrearFuncionDto } from './dto/create-funciones.tdo.js';
import { EditarFuncionDto } from './dto/update-funciones.dto.js';
import type { Request, Response } from 'express';

@Controller('/funciones')
@ApiTags('Funciones')
export class FuncionesController {

    constructor(private readonly funcionesService: FuncionesService) {}

    @Get()
    async getAllFunciones(@Query() query: QuerysObligatoriasDto, @Res() res: Response, @Req() req: Request) {
        const funciones = await this.funcionesService.getAllFunciones(query);
        res.json(funciones);
    }

    @Post()
    async addFuncion(@Body() body: CrearFuncionDto, @Res() res: Response, @Req() req: Request) {
        const funciones = await this.funcionesService.createFunciones(body);
        res.json({
            code: 201,
            message: 'Funcion creada correctamente',
            data: funciones
        })
    }

    @Put(':id_funcion')
    @ApiParam({ name: 'id_funcion', description: 'id de la funcion', example: 1 })
    async editFuncion(@Param('id_funcion') id_funcion: number, @Body() body: EditarFuncionDto, @Res() res: Response) {
        const funcion = await this.funcionesService.editFunciones(Number(id_funcion), body)
        res.json({
            code: 200,
            message: 'Funcion editada correctamente',
            data: funcion
        });
    }

    @Delete(':id_funcion')
    @ApiParam({ name: 'id_funcion', description: 'id de la funcion', example: 1 })
    async deleteFuncion(@Param('id_funcion') id_funcion: number, @Res() res: Response) {
        const result = await this.funcionesService.deletefuncion(id_funcion);
        res.json({
            code: 200,
            message: 'Funcion eliminada correctamente',
            data: result
        });
    }

}
