import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { FindAllTasksUseCase } from "../../use-case/task-use-case/find-all-tasks-use-case";

export class FindAllTasksFactory{
    public static build(){
        const repository = new MySQLTaskRepository();
        return new FindAllTasksUseCase(repository);
    }
}