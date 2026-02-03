import { CreateUserFactory } from "../../../core/factory/user-factory/create-user-factory"
import { FindAllUsersFactory } from "../../../core/factory/user-factory/find-all-users-factory"
import { CreateUserProps } from "../../../core/types/user-types"
import { UserMapper } from "./user-mapper"

export const userResolvers = {
    Query: {
        users: async () => {
            const useCase = FindAllUsersFactory.build()
            const users = await useCase.execute()
            return UserMapper.toGraphQLList(users)
        }
    },

    Mutation: {
        create: async (_: unknown, args: { input: CreateUserProps }) => {
            console.log("CREate", args.input)
            const useCase = CreateUserFactory.build()
            const user = await useCase.execute(args.input)
            return UserMapper.toGraphQL(user)
        }
    }
}