import { MySQLTaskRepository } from "../../adapters/database/mysql/mysql-task-repository";
import { FindByCodeTaskUseCase } from "../use-case/task-use-case/find-by-code-task-use-case";

export class FindByCodeTaskFactory {
    public static build() {
        const repository = new MySQLTaskRepository();
        return new FindByCodeTaskUseCase(repository);
    }
}