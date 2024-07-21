import { UserRole } from './user-auth.interface';

export interface loginDto {
  accessToken: string;
  role: UserRole;
  username: string;
  tmdb_key: string;
}
