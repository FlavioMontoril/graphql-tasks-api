import { MySQLUserRepository } from "../../../adapters/database/mysql/mysql-user-repository";
import { FindAllUsersUseCase } from "../../use-case/user-use-case/find-all-users-use-case";

export class FindAllUsersFactory {
    public static build() {
        const repository = new MySQLUserRepository();
        return new FindAllUsersUseCase(repository)
    }
}