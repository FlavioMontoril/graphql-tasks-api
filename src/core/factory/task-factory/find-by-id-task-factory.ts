import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { findByIdTaskUseCase } from "../../use-case/task-use-case/find-by-id-task-use-case";

export class FindByIdTaskFactory{
    public static build(){
        const taskRepository = new MySQLTaskRepository();
        return new findByIdTaskUseCase(taskRepository);
    }
}