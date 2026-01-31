export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  ARCHIVED = "ARCHIVED",
}

export interface Pagination {
  page?: number;
  perPage?: number;
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

export interface CreateTaskInput {
  code: string,
  summary: string,
  description: string,
  reporter: string,
  assignee?: string,
  status?: TaskStatus
}

export interface UpdateTaskInput {
  summary: string;
  description: string;
  reporter: string;
  assignee?: string | null;
  status?: TaskStatus;
}