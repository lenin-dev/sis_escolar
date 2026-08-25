import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller.js';
import { UsuariosService } from './usuarios.service.js';
import { UsuariosFuncinesService } from './usuarios.funcines.service.js';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosFuncinesService]
})
export class UsuariosModule {}
