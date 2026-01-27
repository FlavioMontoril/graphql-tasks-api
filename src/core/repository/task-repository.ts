// src/core/repository/task-repository.ts
import { Task } from "../entity/task-entity";

export interface Pagination {
  page?: number;
  perPage?: number;
}

export interface TaskRepository {
  create(task: Task): Promise<void>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(pagination?: Pagination): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  findByCode(code: string): Promise<Task | null>;
  count(): Promise<number>;
}
