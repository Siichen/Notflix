import { UserRole } from './user-auth.interface';

export class AppUserRegister {
  username: string = '';
  password: string = '';
  email: string = '';
  tmdb_key: string = '';
  role: string = 'USER'; // new
}

export interface UserInfo {
  id?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  username?: string;
}

export interface AuthDto {
  accessToken: string;
  role: string;
}
