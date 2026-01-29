import { TaskStatus } from "../../../core/entity/task-entity";
import { CountTaskFactory } from "../../../core/factory/task-factory/count-task-factory";
import { CreateTaskFactory } from "../../../core/factory/task-factory/create-task-factory";
import { FindAllTasksFactory } from "../../../core/factory/task-factory/find-all-tasks-factory";
import { FindByIdTaskFactory } from "../../../core/factory/task-factory/find-by-id-task-factory";
import { TaskMapper } from "../mappers/task-mapper";


interface CreateTaskInput {
  code: string,
  summary: string,
  description: string,
  reporter: string,
  assignee?: string,
  status?: TaskStatus
}

export const tasksResolvers = {
  Query: {
    tasks: async (_: any, args: { page?: number; perPage?: number }) => {
      const useCase = FindAllTasksFactory.build();
      const result = await useCase.execute({
        page: args.page,
        perPage: args.perPage,
      });
      return {
        tasks: TaskMapper.toGraphQLList(result.tasks),
        total: result.total

      };
    },

    taskById: async (_: any, args: { id: string }) => {
      const useCase = FindByIdTaskFactory.build();
      const task = await useCase.execute(args.id)

        return task ? TaskMapper.toGraphQL(task) : null;

    },

    // taskByCode: (_: any, args: { code: string }) =>
    //   FindAllTasksFactory.build().taskRepository.findByCode(args.code),

    tasksCount: async () => {
      const useCase = CountTaskFactory.build();
      const total = await useCase.execute()
      return total
    }
  },

  Mutation: {
    createTask: async (_: any, args: { input: CreateTaskInput }) => {
      const useCase = CreateTaskFactory.build();
      const task = await useCase.execute(args.input);
      return TaskMapper.toGraphQL(task)
    },
  },
};
