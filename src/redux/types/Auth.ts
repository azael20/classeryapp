export interface LoginService {
  email: string;
  password: string;
}

export interface RegisterService {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  photo?: string;
}
