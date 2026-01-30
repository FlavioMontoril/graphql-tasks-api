import { Task, TaskStatus } from "../../../core/entity/task-entity";
import { Pagination, TaskRepository } from "../../../core/repository/task-repository";
import { mysqlClient } from "../../../infra/database/mysql";
import { taskQueries } from "../../../sql/task-queries";


export class MySQLTaskRepository implements TaskRepository {
  async create(task: Task): Promise<void> {
    await mysqlClient.execute(taskQueries.CREATE, [
      task.getId(),
      task.getCode(),
      task.getSummary(),
      task.getDescription(),
      task.getReporter(),
      task.getAssignee() ?? null,
      task.getStatus() ?? TaskStatus.OPEN,
      task.getCreatedAt(),
      task.getUpdatedAt(),
      task.getArchived(),
    ]);
  }

  async findAll(pagination?: Pagination): Promise<Task[]> {
    const page = Number(pagination?.page ?? 1);
    const perPage = Number(pagination?.perPage ?? 5);
    const offset = Math.max((page - 1) * perPage, 0);

    const [rows]: any = await mysqlClient.query(taskQueries.FIND_ALL, [offset, perPage]);
    return rows.map((row: any) =>
      Task.build({
        id: row.id,
        code: row.code,
        summary: row.summary,
        description: row.description,
        reporter: row.reporter,
        assignee: row.assignee,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        archived: row.archived,
      })
    );
  }

  async findById(id: string): Promise<Task | null> {
    const [rows]: any = await mysqlClient.execute(taskQueries.FIND_BY_ID, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return Task.build({
      id: row.id,
      code: row.code,
      summary: row.summary,
      description: row.description,
      reporter: row.reporter,
      assignee: row.assignee,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archived: row.archived,
    });
  }

  async findByCode(code: string): Promise<Task | null> {
    const [rows]: any = await mysqlClient.execute(taskQueries.FIND_BY_CODE, [code]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return Task.build({
      id: row.id,
      code: row.code,
      summary: row.summary,
      description: row.description,
      reporter: row.reporter,
      assignee: row.assignee,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      archived: row.archived,
    });
  }

  async save(task: Task): Promise<void> {
    await mysqlClient.execute(taskQueries.UPDATE,
      [
        task.getSummary(),
        task.getDescription(),
        task.getReporter(),
        task.getAssignee(),
        task.getStatus(),
        task.getUpdatedAt(),
        task.getArchived(),
        task.getId(),
      ]
    );
  }

  async delete(id: string): Promise<void> {
    await mysqlClient.execute(taskQueries.DELETE, [id]);
  }

  async count(): Promise<number> {
    const [rows]: any = await mysqlClient.execute(taskQueries.COUNT);
    return rows[0].total;
  }
}
