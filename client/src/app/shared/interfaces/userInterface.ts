export interface ICurrentUser {
  userId: string;
  loginToken: string;
  role?: string;
  email?: string;
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
