import { MySQLTaskRepository } from "../../adapters/database/mysql/mysql-task-repository";
import { TaskStatus } from "../../core/entity/task-entity";
import { CreateTaskFactory } from "../../core/factory/task-factory/create-task-factory";

const repo = new MySQLTaskRepository();

  interface CreateTaskInput {
    code: string,
    summary: string,
    description: string,
    reporter: string,
    assignee?: string,
    status?: TaskStatus
  }

export const resolvers = {  
  Query: {
    tasks: (_: any, args: { page?: number; perPage?: number }) =>
      repo.findAll({ page: args.page, perPage: args.perPage }),
    task: (_: any, args: { id: string }) => repo.findById(args.id),
    taskByCode: (_: any, args: { code: string }) => repo.findByCode(args.code),
    tasksCount: () => repo.count(),
  },
  Mutation: {
    createTask: async (_: any, args: { input: CreateTaskInput }) => {
      const useCase = CreateTaskFactory.build();
      await useCase.execute(args.input);
      return true
    },
  },
};
