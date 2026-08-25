import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UsuarioFuncionDto {

    @ApiPropertyOptional({
        description: 'id del usuario',
        example: 'JB4KJRGH-DFGHDG-DFG-DFGDFG-D',
    })
    @IsString({ message: 'id_usuario tiene que ser de tipo texto' })
    @IsOptional({ message: 'id_usuario puede ser opcional' })
    id_usuario?: string;

    @ApiProperty({
        description: 'id de la funcion',
        example: 1,
    })
    @Type(() => Number)
    @IsInt({ message: 'id_funcion tiene que ser de tipo numero' })
    @IsNotEmpty({ message: 'id_funcion no puede ser vacio' })
    id_funcion!: number;

    @ApiPropertyOptional({
        description: 'fecha de asignacion',
        example: '2026/08/25',
    })
    @IsDate({ message: 'fecha_asignacion tiene que ser de tipo fecha' })
    @IsOptional({ message: 'fecha_asignacion no puede ser vacio' })
    fecha_asignacion?: Date;

}