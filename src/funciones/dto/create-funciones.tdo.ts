import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CrearFuncionDto {

    @ApiProperty({
        description: 'Nombre de la funcion',
        example: 'juan99',
    })
    @IsString({ message: 'funcion tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'funcion no puede ser vacio' })
    nombre_funcion!: string;

    @ApiPropertyOptional({
        description: 'Descripcion de la funcion',
        example: 'juanpass123456',
    })
    @IsString({ message: 'funcion tiene que ser de tipo texto' })
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Fecha de ingreso de la funcion'
    })
    @IsDate()
    @IsOptional()
    fecha_creacion?: Date
}