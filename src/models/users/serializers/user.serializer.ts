import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { Provider } from '../interfaces/user.interface';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGropusForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];

export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGropusForSerializing,
  'user.password',
];

export class UserEntity extends ModelEntity implements IUser {
  id: string;

  email: string;

  name: string;

  provider: Provider;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
