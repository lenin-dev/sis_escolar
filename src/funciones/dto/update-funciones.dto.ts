import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class EditarFuncionDto {

    @ApiPropertyOptional({
        description: 'Nombre de la funcion',
        example: 'ver_usuario2',
    })
    @IsString({ message: 'funcion tiene que ser de tipo texto' })
    @IsOptional({ message: 'funcion no puede ser vacio' })
    nombre_funcion?: string;

    @ApiPropertyOptional({
        description: 'Descripcion de la funcion',
        example: 'ver todos los usuarios 2',
    })
    @IsString({ message: 'funcion tiene que ser de tipo texto' })
    @IsOptional()
    descripcion?: string;

}