# Excepciones HTTP en NestJS

NestJS trae un set de excepciones ya integradas que heredan de `HttpException`. Cada una setea automáticamente el status code correspondiente. Se importan desde `@nestjs/common`.

```ts
import { NotFoundException } from '@nestjs/common';
```

| Excepción | Código HTTP | Significado |
|---|---|---|
| `BadRequestException` | 400 | La petición está mal formada o los datos enviados no son válidos (ej: falló una validación de DTO). |
| `UnauthorizedException` | 401 | El cliente no está autenticado o sus credenciales son inválidas/faltantes (token ausente o expirado). |
| `NotFoundException` | 404 | El recurso solicitado no existe (ej: buscar un usuario por ID que no está en la BD). |
| `ForbiddenException` | 403 | El cliente está autenticado pero no tiene permisos para realizar esa acción. |
| `NotAcceptableException` | 406 | El servidor no puede generar una respuesta que cumpla con los headers `Accept` que mandó el cliente. |
| `RequestTimeoutException` | 408 | El cliente tardó demasiado en enviar la petición completa y el servidor la cortó. |
| `ConflictException` | 409 | La petición entra en conflicto con el estado actual del recurso (ej: crear un usuario con un email que ya existe). |
| `GoneException` | 410 | El recurso existió antes pero fue eliminado permanentemente y no va a volver a estar disponible. |
| `HttpVersionNotSupportedException` | 505 | El servidor no soporta la versión del protocolo HTTP usada en la petición. |
| `PayloadTooLargeException` | 413 | El cuerpo de la petición (body) excede el tamaño máximo permitido por el servidor. |
| `UnsupportedMediaTypeException` | 415 | El `Content-Type` del body no es soportado (ej: mandar XML cuando el endpoint solo acepta JSON). |
| `UnprocessableEntityException` | 422 | La petición está bien formada sintácticamente, pero semánticamente no se puede procesar (ej: reglas de negocio no cumplidas). |
| `InternalServerErrorException` | 500 | Error genérico e inesperado del lado del servidor (bug, excepción no controlada, etc). |
| `NotImplementedException` | 501 | El servidor no soporta la funcionalidad requerida para cumplir la petición (endpoint/método aún no implementado). |
| `ImATeapotException` | 418 | Easter egg del protocolo HTTP ("soy una tetera"). No tiene uso real en producción. |
| `MethodNotAllowedException` | 405 | El método HTTP usado (GET, POST, etc) no está permitido para esa ruta. |
| `BadGatewayException` | 502 | El servidor, actuando como gateway/proxy, recibió una respuesta inválida de un servidor upstream. |
| `ServiceUnavailableException` | 503 | El servidor no está disponible temporalmente (mantenimiento, sobrecarga, etc). |
| `GatewayTimeoutException` | 504 | El servidor, actuando como gateway/proxy, no recibió respuesta a tiempo de un servidor upstream. |
| `PreconditionFailedException` | 412 | Una precondición enviada en los headers de la petición (ej: `If-Match`) no se cumplió en el servidor. |

## Ejemplo de uso

```ts
@Get(':id')
async findOne(@Param('id') id: string) {
  const user = await this.usersService.findById(id);

  if (!user) {
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);
  }

  return user;
}
```

Todas reciben un mensaje opcional como primer argumento (string u objeto), que se incluye en el body de la respuesta de error.