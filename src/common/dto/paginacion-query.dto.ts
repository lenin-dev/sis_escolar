import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class QuerysObligatoriasDto {

    @ApiProperty({
        description: 'limite de datos a buscar',
        example: 10,
        minimum: 1,
        maximum: 100,
    })
    @Type(() => Number)
    @IsInt({ message: 'limite tiene que ser un numero entero' })
    @Min(1, { message: 'limite debe ser mayor o igual a 1' })
    @Max(100, { message: 'limite no puede ser mayor a 100' })
    @IsNotEmpty({ message: 'limite no puede ser vacio' })
    limite!: number;

    @ApiProperty({
        description: 'pagina para los datos de la mano de limite',
        example: 1,
        minimum: 1,
    })
    @Type(() => Number)
    @IsInt({ message: 'pagina tiene que ser un numero entero' })
    @Min(1, { message: 'pagina debe ser mayor o igual a 1' })
    @IsNotEmpty({ message: 'pagina no puede ser vacio' })
    pagina!: number;

    @ApiProperty({
        description: 'ordenar la busqueda de los datos',
        example: 'ASC',
        enum: ['ASC', 'DESC'],
    })
    @IsString({ message: 'ordenar tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'ordenar no puede ser vacio' })
        @IsIn(['ASC', 'DESC'], {
        message: 'ordenar solamente puede ser ASC o DESC',
    })
    ordenar!: string;

    @ApiProperty({
        description: 'ordenar la busqueda por el nombre ingresado',
        example: 'nombre_completo'
    })
    @IsString({ message: 'campo tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'campo no puede ser vacio' })
    campo_ordenar!: string;

}