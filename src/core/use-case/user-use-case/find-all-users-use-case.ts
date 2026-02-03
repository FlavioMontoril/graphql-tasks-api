import { User } from "../../entity/user-entity";
import { UserRepository } from "../../repository/user-repository";

export class FindAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    public async execute(): Promise<User[]> {
        return await this.userRepository.findAll()
    }
}