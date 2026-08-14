import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditarUsuario {

    @IsString({ message: 'usuario tiene que ser de tipo texto' })
    @IsOptional()
    usuario?: string;

    @IsString({ message: 'contrasena usuario tiene que ser de tipo texto' })
    @IsOptional()
    contrasena?: string;

    @IsString({ message: 'nombre_completo usuario tiene que ser de tipo texto' })
    @IsOptional()
    nombre_completo?: string;

    @IsEmail({}, { message: 'correo tiene que ser un correo válido' })
    @IsString({ message: 'correo usuario tiene que ser de tipo texto' })
    @IsOptional()
    correo?: string;

    @IsBoolean({ message: 'activo tiene que ser de tipo booleano' })
    @IsOptional()
    activo?: boolean;
}
