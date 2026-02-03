import { Task } from "../../../core/entity/task-entity";

export class TaskMapper {
 public static toGraphQL(task: Task) {
    return {
      id: task.getId(),
      code: task.getCode(),
      summary: task.getSummary(),
      description: task.getDescription(),
      reporter: task.getReporter(),
      assignee: task.getAssignee(),
      status: task.getStatus(),
      createdAt: task.getCreatedAt()?.toISOString(),
      updatedAt: task.getUpdatedAt()?.toISOString() ?? null,
      archived: task.getArchived(),
    };
  }

  public static toGraphQLList(tasks: Task[]) {
    return tasks.map(TaskMapper.toGraphQL);
  }
}
