export interface Repository<Entity, CreateDTO, UpdateDTO, Id = number> {
  findById(id: Id): Promise<Entity | null>;
  create(input: CreateDTO): Promise<Entity>;
  update(input: UpdateDTO): Promise<Entity>;
  delete(id: Id): Promise<void>;
}
