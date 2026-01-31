import { Task } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";
import { TaskStatus, UpdateTaskInput } from "../../types/task-types";

export class UpdateTaskUseCase {
    constructor(private readonly repository: TaskRepository) { }
    public async execute(payload: UpdateTaskInput, taskId: string): Promise<Task> {
        const task = await this.repository.findById(taskId)
        if (!task) throw new Error('Resource Not Found Exception')
        if (task.getStatus() === TaskStatus.DONE) throw new Error('Invalid Operation Exeption')

        if (payload.summary !== undefined) task.setSummary(payload.summary);
        if (payload.description !== undefined) task.setDescription(payload.description);
        if (payload.reporter !== undefined) task.setReporter(payload.reporter);
        if (payload.assignee !== undefined) task.setAssignee(payload.assignee);
        if (payload.status !== undefined) task.setStatus(payload.status ?? null);
        task.touchUpdated();

        await this.repository.save(task)
        return task
    }
}