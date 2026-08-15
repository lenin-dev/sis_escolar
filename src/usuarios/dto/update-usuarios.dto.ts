import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditarUsuario {

    @ApiPropertyOptional({
        description: 'Nombre del usuario',
        example: 'juan99',
    })
    @IsString({ message: 'usuario tiene que ser de tipo texto' })
    @IsOptional()
    usuario?: string;

    @ApiPropertyOptional({
        description: 'Contraseña del usuario',
        example: 'juanpass123456',
    })
    @IsString({ message: 'contrasena usuario tiene que ser de tipo texto' })
    @IsOptional()
    contrasena?: string;

    @ApiPropertyOptional({
        description: 'Nombre completo del usuario',
        example: 'juan escutia',
    })
    @IsString({ message: 'nombre_completo usuario tiene que ser de tipo texto' })
    @IsOptional()
    nombre_completo?: string;

    @ApiPropertyOptional({
        description: 'Email del usuario',
        example: 'ejemplo@gmail.com',
    })
    @IsEmail({}, { message: 'correo tiene que ser un correo válido' })
    @IsString({ message: 'correo usuario tiene que ser de tipo texto' })
    @IsOptional()
    correo?: string;

    @ApiPropertyOptional({
        description: 'Estado del usuario',
        example: true,
    })
    @IsBoolean({ message: 'activo tiene que ser de tipo booleano' })
    @IsOptional()
    activo?: boolean;
}
