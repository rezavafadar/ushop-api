import { Connection } from 'mongoose';

import { UserSchema } from '../../schema/user.schema';
import { DATABASE_CONNECTION_TOKEN, USER_MODEL_TOKEN } from '../../constants';

export const userProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: [DATABASE_CONNECTION_TOKEN],
  },
];
