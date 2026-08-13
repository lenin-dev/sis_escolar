import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [UsuariosModule, PrismaModule],
})
export class AppModule {}
