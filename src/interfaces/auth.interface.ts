export enum VerifyMethod {
  EMAIL = 'email',
  PHONE = 'phone',
}

export interface IGenerationInfo {
  identifier: string;
  method: VerifyMethod;
}

export interface IVerifyInfo extends IGenerationInfo {
  code: string;
}
