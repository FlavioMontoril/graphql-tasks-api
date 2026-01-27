import { MySQLTaskRepository } from "../../../adapters/database/mysql/mysql-task-repository";
import { CreateTaskUseCase } from "../../use-case/task-use-case/create-task-use-case";


export class CreateTaskFactory {
  static build() {
    const repo = new MySQLTaskRepository();
    return new CreateTaskUseCase(repo);
  }
}
