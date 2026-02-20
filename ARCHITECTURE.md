# Arquitectura Hexagonal - NestJS + Supabase

##  Estructura del Proyecto

```
src/
├── api/                           # Capa de presentación (NO forma parte del hexágono)
│   ├── controllers/               # Controladores REST/GraphQL
│   └── middleware/                # Middlewares de Express/NestJS
│
├── domain/                        # Capa de dominio (NÚCLEO del hexágono)
│   ├── entities/                  # Entidades de negocio
│   └── ports/                     # Interfaces/Contratos
│       ├── inbound/              # Puertos de entrada (Commands/Queries)
│       └── outbound/             # Puertos de salida (Repositories, External Services)
│
├── application/                   # Capa de aplicación (DENTRO del hexágono)
│   ├── commands/                  # Casos de uso de escritura (Commands)
│   └── queries/                   # Casos de uso de lectura (Queries)
│
└── infrastructure/                # Capa de infraestructura (FUERA del hexágono)
    ├── adapters/                  # Implementaciones de los puertos
    │   ├── persistence/          # Adaptadores de base de datos (Supabase)
    │   └── messaging/            # Adaptadores de mensajería (opcional)
    └── config/                    # Configuraciones de infraestructura
```

##  Principios de la Arquitectura

### 1. **API Layer (api/)**
- **Responsabilidad**: Punto de entrada HTTP/REST
- **Contiene**: Controllers y Middleware
- **Regla estricta**: NO debe tener lógica de negocio
- **Dependencias**: Solo puede depender de `domain/ports/inbound`

### 2. **Domain Layer (domain/)**
- **Responsabilidad**: Lógica de negocio pura
- **Contiene**: Entidades y definición de puertos
- **Regla estricta**: NO debe depender de ninguna otra capa
- **Independencia**: Totalmente agnóstico de frameworks e infraestructura

#### 2.1 Entities (domain/entities/)
- Modelos de dominio con reglas de negocio
- Objetos de valor
- Agregados

#### 2.2 Ports (domain/ports/)
- **Inbound (entrada)**: Interfaces de Commands y Queries
- **Outbound (salida)**: Interfaces de Repositories y servicios externos

### 3. **Application Layer (application/)**
- **Responsabilidad**: Orquestación de casos de uso
- **Contiene**: Commands (escritura) y Queries (lectura)
- **Regla estricta**: Implementa `domain/ports/inbound`
- **Dependencias**: Puede usar `domain/entities` y `domain/ports/outbound`

#### 3.1 Commands (application/commands/)
- Operaciones que modifican el estado (CREATE, UPDATE, DELETE)
- Ejemplo: `CreateUserCommand`, `UpdateUserCommand`

#### 3.2 Queries (application/queries/)
- Operaciones de solo lectura (READ)
- Ejemplo: `GetUserQuery`, `ListUsersQuery`

### 4. **Infrastructure Layer (infrastructure/)**
- **Responsabilidad**: Detalles técnicos e implementaciones
- **Contiene**: Adaptadores de persistencia, mensajería, configuración
- **Regla estricta**: Implementa `domain/ports/outbound`
- **Dependencias**: Puede usar todo lo demás

#### 4.1 Adapters (infrastructure/adapters/)
- **Persistence**: Implementaciones de repositorios (Supabase, TypeORM, etc.)
- **Messaging**: Implementaciones de pub/sub, eventos (opcional)

##  Flujo de Dependencias

```
API Layer
    ↓ (depende de)
Inbound Ports (interfaces)
    ↑ (implementado por)
Application Layer (Commands/Queries)
    ↓ (depende de)
Outbound Ports (interfaces) + Domain Entities
    ↑ (implementado por)
Infrastructure Layer (Adapters)
```

##  Reglas Estrictas

1. **Domain NO depende de nadie** - Es el núcleo puro
2. **Application depende solo de Domain** - Implementa casos de uso
3. **Infrastructure depende de Domain** - Implementa adaptadores
4. **API depende solo de Inbound Ports** - Punto de entrada
5. **Las dependencias SIEMPRE apuntan hacia adentro** (hacia el domain)

##  Ejemplo: Crear un Usuario

```
1. Request HTTP → UserController (api/controllers)
2. Controller llama → CreateUserCommand (application/commands)
3. Command usa → IUserRepository (domain/ports/outbound)
4. Repository implementado por → SupabaseUserRepository (infrastructure/adapters/persistence)
5. Response ← Resultado regresa por el mismo camino
```

##  Tecnologías

- **Framework**: NestJS
- **Base de datos**: Supabase
- **Patrón**: CQRS simplificado (Commands + Queries)
- **Arquitectura**: Hexagonal (Ports & Adapters)
