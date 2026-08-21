import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { FuncionesService } from './funciones.service.js';
import { ApiTags } from '@nestjs/swagger';
import { QuerysObligatoriasDto } from '../common/dto/paginacion-query.dto.js';
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

}
