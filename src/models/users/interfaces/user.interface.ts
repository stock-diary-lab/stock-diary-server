export type Provider = 'google' | 'kakao';

export interface IUser {
  name: string;
  email: string;
  password: string;
  provider: Provider;
}
