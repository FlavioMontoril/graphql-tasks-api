// src/core/entity/task-entity.ts
import { v4 as uuidv4 } from "uuid";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

export interface TaskProps {
  id?: string;
  code: string;
  summary: string;
  description: string;
  reporter: string;
  assignee?: string | null;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date | null;
  archived?: boolean;
}

export class Task {
  private props: TaskProps;

  private constructor(props: TaskProps) {
    this.props = {...props};
  }

  public static build(props: TaskProps) {
    return new Task({
      ...props,
      id: props.id || uuidv4(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      archived: props.archived ?? false,
      status: props.status ?? TaskStatus.OPEN,
    });
  }

  public getId() { return this.props.id; }
  public getCode() { return this.props.code; }
  public getSummary() { return this.props.summary; }
  public getDescription() { return this.props.description; }
  public getReporter() { return this.props.reporter; }
  public getAssignee() { return this.props.assignee; }
  public getStatus() { return this.props.status; }
  public getCreatedAt() { return this.props.createdAt; }
  public getUpdatedAt() { return this.props.updatedAt; }
  public getArchived() { return this.props.archived; }

  public setArchived(value: boolean) { this.props.archived = value; }
  public update(props: Partial<TaskProps>) {
    this.props = { ...this.props, ...props, updatedAt: new Date() };
  }
}
