export interface UserModel {
  id: number;
  name: string;
  password: string;
  repeat_password: string;
  startDate?: Date;
  endDate?: Date;
}
