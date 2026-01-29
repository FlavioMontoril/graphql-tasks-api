import { Task } from "../../entity/task-entity";
import { Pagination, TaskRepository } from "../../repository/task-repository";


export class FindAllTasksUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }
    public async execute(pagination: Pagination): Promise<{ tasks: Task[]; total: number }> {
        const page = pagination?.page ?? 1;
        const perPage = pagination?.perPage ?? 5;

        if (page <= 0 || perPage <= 0) {
            throw new Error("Pagination values must be greater than zero");
        }

        const tasks = await this.taskRepository.findAll({ page, perPage });
        const total = await this.taskRepository.count();
        return {tasks, total};
    }
}