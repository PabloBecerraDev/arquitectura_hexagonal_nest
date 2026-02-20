# NestJS + Supabase - Arquitectura Hexagonal

Proyecto base con **NestJS** y **Supabase** implementando **Arquitectura Hexagonal** estricta.

##  Características

- ✅ **Arquitectura Hexagonal** (Ports & Adapters)
- ✅ **CQRS simplificado** (Commands & Queries)
- ✅ **Separación estricta de capas**
- ✅ **IGenericRepository** base para todas las entidades
- ✅ **Supabase** como base de datos
- ✅ **TypeScript** con configuración estricta
- ✅ **Dependency Injection** con NestJS

##  Estructura

Ver documentación detallada en [ARCHITECTURE.md](./ARCHITECTURE.md)

```
src/
├── api/                    # Capa de presentación (Controllers, Middleware)
├── domain/                 # Núcleo del negocio (Entities, Ports)
├── application/            # Casos de uso (Commands, Queries)
└── infrastructure/         # Implementaciones técnicas (Adapters, Config)
```

##  Instalación

```bash
# Instalar dependencias
npm install


# Configurar variables de entorno en .env
```

##  Configuración

Edita el archivo `.env` con tus credenciales de Supabase:

```env
SUPABASE_URL=tu-url-de-supabase
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

##  Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:watch
npm run test:cov
```

##  Documentación

- [Arquitectura Hexagonal](./ARCHITECTURE.md) - Explicación detallada de la estructura
- [Supabase Docs](https://supabase.com/docs)
- [NestJS Docs](https://docs.nestjs.com)



##  Reglas de Arquitectura

1.  **Domain** NO puede depender de ninguna otra capa
2.  **Application** solo depende de **Domain**
3.  **Infrastructure** implementa las interfaces de **Domain**
4.  **API** solo conoce los puertos de entrada (inbound)
5.  Las dependencias siempre apuntan hacia adentro (hacia Domain)

