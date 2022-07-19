import { Request } from 'express';

export const getServerUrl = (req: Request, ...additionalPath: string[]) =>
  `${req.protocol}://${req.get('host')}/` + additionalPath.join('/');
