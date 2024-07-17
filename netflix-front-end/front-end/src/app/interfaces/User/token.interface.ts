import { UserRole } from './user-auth.interface';

export interface Token {
  accessToken: string;
  role: UserRole;
}

export interface RefreshTokenDto {
  token: string;
}
