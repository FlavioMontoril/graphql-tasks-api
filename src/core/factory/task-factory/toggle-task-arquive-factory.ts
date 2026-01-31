import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { ToggleTaskArchiveUseCase } from "../../use-case/task-use-case/toggle-task-arquive-use-case";

export class ToggleTaskArchiveFactory {
    public static build() {
        const repository = new MySQLTaskRepository();
        return new ToggleTaskArchiveUseCase(repository);
    }
}