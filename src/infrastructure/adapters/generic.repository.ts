// infrastructure/adapters/generic.repository.ts
import { Repository, ObjectLiteral } from 'typeorm';

export abstract class GenericRepository<Domain, Orm extends ObjectLiteral> {
    constructor(protected readonly repository: Repository<Orm>) {}

    async save(entity: Domain): Promise<Domain> {
        const orm = this.toOrm(entity);
        const saved = await this.repository.save(orm);
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<Domain | null> {
        const entity = await this.repository.findOne({ where: { id } as any });
        return entity ? this.toDomain(entity) : null;
    }

    async findAll(): Promise<Domain[]> {
        const entities = await this.repository.find();
        return entities.map(e => this.toDomain(e));
    }

    async update(entity: Domain): Promise<Domain> {
        const orm = this.toOrm(entity);
        const updated = await this.repository.save(orm);
        return this.toDomain(updated);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    protected abstract toOrm(domain: Domain): Orm;
    protected abstract toDomain(orm: Orm): Domain;
}