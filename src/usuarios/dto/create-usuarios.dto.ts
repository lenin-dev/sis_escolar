import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearUsuario {

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'juan99',
    })
    @IsString({ message: 'usuario tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'usuario no puede ser vacio' })
    usuario!: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'juanpass123456',
    })
    @IsString({ message: 'contrasena tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'contrasena no puede ser vacio' })
    contrasena!: string;

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'juan escutia',
    })
    @IsString({ message: 'nombre_completo tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'nombre_completo no puede ser vacio' })
    nombre_completo!: string;

    @ApiPropertyOptional({
        description: 'Email del usuario',
        example: 'ejemplo@gmail.com',
    })
    @IsEmail({}, { message: 'correo tiene que ser un correo válido' })
    @IsString({ message: 'correo tiene que ser de tipo texto' })
    correo?: string;

    @ApiProperty({
        description: 'Estado del usuario',
        example: true,
    })
    @IsBoolean({ message: 'activo tiene que ser de tipo booleano' })
    activo!: boolean;

}