import { TaskProps, TaskStatus } from "../types/task-types";
import { randomUUID } from "crypto";

export class Task {
  private readonly id: string;
  private readonly code: string;
  private summary: string;
  private description: string;
  private reporter: string;
  private assignee: string | null;
  private status: TaskStatus;
  private readonly createdAt?: Date;
  private updatedAt: Date | null;
  private archived: boolean;

  private constructor(data: TaskProps) {
    this.id = data.id ?? randomUUID();
    this.code = data.code;
    this.summary = data.summary;
    this.description = data.description;
    this.reporter = data.reporter;
    this.assignee = data.assignee ?? null;
    this.status = data.status ?? TaskStatus.OPEN;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? null;
    this.archived = data.archived ?? false;
  }

  public static build(data: TaskProps) {
    return new Task(data);
  }

  public toggleArchived() {
    this.archived = !this.archived;
    this.updatedAt = new Date();
  }

  public touchUpdated() {
    this.updatedAt = new Date();
  }

  public getId() { return this.id; }
  public getCode() { return this.code; }
  public getSummary() { return this.summary; }
  public getDescription() { return this.description; }
  public getReporter() { return this.reporter; }
  public getAssignee() { return this.assignee; }
  public getStatus() { return this.status; }
  public getCreatedAt() { return this.createdAt; }
  public getUpdatedAt() { return this.updatedAt; }
  public getArchived() { return this.archived; }

  public setSummary(summary: string) { this.summary = summary; }
  public setDescription(description: string) { this.description = description; }
  public setReporter(reporter: string) { this.reporter = reporter; }
  public setAssignee(assignee: string | null | undefined) { this.assignee = assignee ?? null; }
  public setStatus(status: TaskStatus | null) { this.status = status ?? this.status; }

}
