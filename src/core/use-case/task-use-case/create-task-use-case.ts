import { Task, TaskStatus } from "../../entity/task-entity";
import { TaskRepository } from "../../repository/task-repository";

interface TaskCreatePayload {
    code: string;
    summary: string;
    description: string;
    reporter: string;
    assignee?: string;
    status?: TaskStatus;
}

export class CreateTaskUseCase {
    constructor(private repo: TaskRepository) { }

    async execute(payload: TaskCreatePayload): Promise<Task> {
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
