export enum Provider {
  GOOGLE = 'google',
  APPLE = 'apple',
  KAKAO = 'kakao',
}

export interface IUser {
  providerId: string;
  nickname: string;
  provider: Provider;
}
