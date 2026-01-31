import { Task } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";

export class ToggleTaskArchiveUseCase {
    constructor(private readonly repository: TaskRepository) { }

    async execute(taskId: string): Promise<Task> {
        const task = await this.repository.findById(taskId);
        if (!task) throw new Error('Resource Not Found Exception');

        task.toggleArchived();
        task.touchUpdated();
        await this.repository.save(task);
        return task;
    }
}
