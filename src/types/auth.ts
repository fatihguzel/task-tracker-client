export interface IAuth {
  id?: string;
  email?: string | null;
  password?: string | null;
  role?: string | null;
  username?: string | null;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  updatedAt?: Date;
}
