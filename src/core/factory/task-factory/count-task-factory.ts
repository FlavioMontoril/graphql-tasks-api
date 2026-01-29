import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { CountTaskUseCase } from "../../use-case/task-use-case/count-task-use-case";

export class CountTaskFactory{
    public static build(){
        const taskRepository = new MySQLTaskRepository();
        return new CountTaskUseCase(taskRepository);
    }
}