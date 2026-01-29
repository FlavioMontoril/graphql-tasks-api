import { Task, TaskStatus } from "../../../core/entity/task-entity";
import { Pagination, TaskRepository } from "../../../core/repository/task-repository";
import { mysqlClient } from "../../../infra/database/mysql";


export class MySQLTaskRepository implements TaskRepository {
  async create(task: Task): Promise<void> {
    const sql = `
      INSERT INTO tasks 
      (id, code, summary, description, reporter, assignee, status, created_at, updated_at, archived)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await mysqlClient.execute(sql, [
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
    const page = pagination?.page ?? 1;
    const perPage = pagination?.perPage ?? 5;
    const offset = (page - 1) * perPage;

    const [rows]: any = await mysqlClient.execute(
      `SELECT * FROM tasks ORDER BY created_at DESC LIMIT ${perPage} OFFSET ${offset}`,
      [perPage, offset]
    );
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
    const [rows]: any = await mysqlClient.execute(`SELECT * FROM tasks WHERE id = ?`, [id]);
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
    const [rows]: any = await mysqlClient.execute(`SELECT * FROM tasks WHERE code = ? LIMIT 1`, [code]);
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
    await mysqlClient.execute(
      `UPDATE tasks SET summary=?, description=?, reporter=?, assignee=?, status=?, updated_at=?, archived=? WHERE id=?`,
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
    await mysqlClient.execute(`DELETE FROM tasks WHERE id=?`, [id]);
  }

  async count(): Promise<number> {
    const [rows]: any = await mysqlClient.execute(`SELECT COUNT(*) as total FROM tasks`);
    return rows[0].total;
  }
}
