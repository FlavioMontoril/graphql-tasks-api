import { MySQLUserRepository } from "../../../adapters/database/mysql/mysql-user-repository";
import { CreateUserUseCase } from "../../use-case/user-use-case/create-user-use-case";

export class CreateUserFactory {
    public static build(){
        const userRepository = new MySQLUserRepository();
        return new CreateUserUseCase(userRepository);
    }
}