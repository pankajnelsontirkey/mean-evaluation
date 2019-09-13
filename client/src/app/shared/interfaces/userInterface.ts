export interface IUser {
  id: string;
  role: string;
  token?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword?: string;
}
