import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearUsuario {
    
    @IsString({ message: 'usuario tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'usuario no puede ser vacio' })
    usuario!: string;

    @IsString({ message: 'contrasena tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'contrasena no puede ser vacio' })
    contrasena!: string;

    @IsString({ message: 'nombre_completo tiene que ser de tipo texto' })
    @IsNotEmpty({ message: 'nombre_completo no puede ser vacio' })
    nombre_completo!: string;

    @IsEmail({}, { message: 'correo tiene que ser un correo válido' })
    @IsString({ message: 'correo tiene que ser de tipo texto' })
    correo?: string;

    @IsBoolean({ message: 'activo tiene que ser de tipo booleano' })
    activo!: boolean;

}