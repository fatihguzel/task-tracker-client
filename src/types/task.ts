import { IAuth } from "./auth";

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  endDate?: string;
  startDate?: string;
  progress?: number;
  users?: IAuth[] | undefined;
  createdAt?: string;
  updatedAt?: string;
}
