import { CountTaskFactory } from "../../../core/factory/task-factory/count-task-factory";
import { CreateTaskFactory } from "../../../core/factory/task-factory/create-task-factory";
import { FindAllTasksFactory } from "../../../core/factory/task-factory/find-all-tasks-factory";
import { FindByCodeTaskFactory } from "../../../core/factory/task-factory/find-by-code-task-factory";
import { FindByIdTaskFactory } from "../../../core/factory/task-factory/find-by-id-task-factory";
import { ToggleTaskArchiveFactory } from "../../../core/factory/task-factory/toggle-task-arquive-factory";
import { UpdateTaskFactory } from "../../../core/factory/task-factory/update-task-factory";
import { CreateTaskInput, UpdateTaskInput } from "../../../core/types/task-types";
import { TaskMapper } from "../mappers/task-mapper";


export const tasksResolvers = {
  Query: {
    tasks: async (_: unknown, args: { page?: number; perPage?: number }) => {
      const page = Number(args.page ?? 1);
      const perPage = Number(args.perPage ?? 5);

      const useCase = FindAllTasksFactory.build();
      const result = await useCase.execute({
        page,
        perPage,
      });
      return {
        tasks: TaskMapper.toGraphQLList(result.tasks),
        total: result.total

      };
    },

    taskById: async (_: unknown, args: { id: string }) => {
      const useCase = FindByIdTaskFactory.build();
      const task = await useCase.execute(args.id)

      return task ? TaskMapper.toGraphQL(task) : null;

    },

    taskByCode: async (_: unknown, args: { code: string }) => {
      const useCase = FindByCodeTaskFactory.build()
      const task = await useCase.execute(args.code);

      return task ? TaskMapper.toGraphQL(task) : null;
    },

    tasksCount: async () => {
      const useCase = CountTaskFactory.build();
      const total = await useCase.execute()
      return total
    }
  },

  Mutation: {
    createTask: async (_: unknown, args: { input: CreateTaskInput }) => {
      const useCase = CreateTaskFactory.build();
      const task = await useCase.execute(args.input);
      return TaskMapper.toGraphQL(task)
    },

    updateTask: async (_: unknown, args: { input: UpdateTaskInput, taskId: string }) => {
      const useCase = UpdateTaskFactory.build();
      const updatedTask = await useCase.execute(args.input, args.taskId)
      return TaskMapper.toGraphQL(updatedTask);
    },

    toggleTaskArchive: async (_: unknown, { taskId }: any) => {
      const useCase = ToggleTaskArchiveFactory.build();
      const archived = await useCase.execute(taskId)
      return TaskMapper.toGraphQL(archived)
    }
  },
};
