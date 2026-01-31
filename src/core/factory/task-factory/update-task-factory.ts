import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { UpdateTaskUseCase } from "../../use-case/task-use-case/update-task-use-case";

export class UpdateTaskFactory {
    public static build() {
        const repository = new MySQLTaskRepository();
        return new UpdateTaskUseCase(repository);
    }
}