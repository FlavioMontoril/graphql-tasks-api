import { User } from "../../../core/entity/user-entity"
import { UserRepository } from "../../../core/repository/user-repository"
import { mysqlClient } from "../../../infra/database/mysql"
import { userQueries } from "../../../sql/user-queries"
export class MySQLUserRepository implements UserRepository {
    public async create(user: User): Promise<void> {
        await mysqlClient.execute(userQueries.CREATE, [
            user.getId(),
            user.getName(),
            user.getDepartment(),
            user.getEmail(),
            user.getPasswordHash(),
            user.getCreatedAt(),
            user.getUpdatedAt(),
        ]);
    }

    public async findAll(): Promise<User[]> {
        const [rows]: any = await mysqlClient.execute(userQueries.FINDALL);
        return rows.map((row: any) =>
            User.build({
                id: row.id,
                name: row.name,
                department: row.department,
                email: row.email,
                passwordHash: row.password_hash,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            })
        );
    }
}