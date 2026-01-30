import { Task } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";

export class FindByCodeTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }
    public async execute(code: string): Promise<Task | null> {
        const task = await this.taskRepository.findByCode(code);
        if (!task) return null

        return task

    }
}