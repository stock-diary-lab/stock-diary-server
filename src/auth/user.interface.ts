export enum Provider {
  GOOGLE = 'google',
  APPLE = 'apple',
  KAKAO = 'kakao',
}

export interface IUser {
  name: string;
  email: string;
  password: string | null;
  provider: Provider;
}
