import { IUser } from 'src/interfaces/user.interfaces';

export const RESEND_TIME_ACTIVATION_CODE = 120;
export const activationCodeRange = 5;

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';
export const USER_MODEL_TOKEN = 'USER_MODEL';

export const NOT_ALLOW_USER_DOCUMENT_KEYS: Array<keyof IUser> = [
  'password',
  'refreshToken',
  'createdAt',
  'updatedAt',
];
