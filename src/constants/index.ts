import { IUser } from 'src/interfaces/user.interfaces';

export const RESEND_TIME_ACTIVATION_CODE = 120;
export const activationCodeRange = 5;

// Tokens - Metadatas
export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';
export const USER_MODEL_TOKEN = 'USER_MODEL';
export const PRODUCT_MODEL_TOKEN = 'PRODUCT_MODEL';

export const ROLE_METADATA = 'role';

export const NOT_ALLOW_USER_DOCUMENT_KEYS: Array<keyof IUser> = [
  'password',
  'refreshToken',
  'createdAt',
  'updatedAt',
];

export const USER_PHOTO_FORMMAT = 'jpeg';
