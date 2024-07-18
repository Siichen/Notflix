export class AppUserAuth {
  id?: string;
  username?: string;
  email?: string;
  role?: UserRole = UserRole.USER;
  jwtToken?: string;
  tmdb_key?: string;
  exp?: any;
}

export enum UserRole {
  USER = 'USER',
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN',
}
