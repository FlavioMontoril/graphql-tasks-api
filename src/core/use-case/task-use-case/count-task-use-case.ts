import { TaskRepository } from "../../repository/task-repository";

export class CountTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }
    public async execute(): Promise<number> {
        return await this.taskRepository.count()
    }
}