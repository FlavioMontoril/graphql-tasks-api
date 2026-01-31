import { Task } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";
import { CreateTaskInput, TaskStatus } from "../../types/task-types";

export class CreateTaskUseCase {
    constructor(private repo: TaskRepository) { }

    async execute(payload: CreateTaskInput): Promise<Task> {
        const exists = await this.repo.findByCode(payload.code);
        if (exists) throw new Error("Task already exists");

        const task = Task.build({
            code: payload.code,
            summary: payload.summary,
            description: payload.description,
            reporter: payload.reporter,
            assignee: payload.assignee ?? null,
            status: payload.status ?? TaskStatus.OPEN,
        });
        await this.repo.create(task);
        return task
    }
}
