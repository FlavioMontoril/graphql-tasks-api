import { Task } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";

export class findByIdTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }
    public async execute(id: string): Promise<Task | null> {
        const task = await this.taskRepository.findById(id)
        if (!task) return null

        return task
    }
}