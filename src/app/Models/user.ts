export class User {
  email?: string | undefined | null;
  password?: string | undefined | null;
}


export interface UserModel {
  name: string,
  [prop: string]: any
}
