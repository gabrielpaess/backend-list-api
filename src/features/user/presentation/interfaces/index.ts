export interface IUser {
  name: string;
  password: string;
  repeat_password: string;
}

export interface IID {
  id?: string;
}

export interface IName {
  name?: string;
}

export interface IPassword {
  password: string;
  repeat_password: string;
}

export interface INameID {
  id?: string;
  name?: string;
}
