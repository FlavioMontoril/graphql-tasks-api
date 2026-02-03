import { User } from "../../entity/user-entity";
import { UserRepository } from "../../repository/user-repository";
import { CreateUserProps } from "../../types/user-types";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    public async execute(payload: CreateUserProps): Promise<User> {
        if (!payload.department || !payload.email || !payload.name || !payload.passwordHash) {
            throw new Error('Invalid Properties Exeption')
        }

        const user = User.build({
            name: payload.name,
            department: payload.department,
            email: payload.email,
            passwordHash: payload.passwordHash
        })

        await this.userRepository.create(user)
        return user
    }
}