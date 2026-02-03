import { User } from "../../../core/entity/user-entity";

export class UserMapper {
    public static toGraphQL(user: User) {
        return {
            id: user.getId(),
            name: user.getName(),
            department: user.getDepartment(),
            email: user.getEmail(),
            passwordHash: user.getPasswordHash(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt() ?? null,
        };
    }

    public static toGraphQLList(users: User[]) {
        return users.map(UserMapper.toGraphQL);
    }
}
