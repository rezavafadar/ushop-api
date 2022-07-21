import { SetMetadata } from '@nestjs/common';

import { ROLE_METADATA } from '../constants';
import { RoleEnum } from '../enums/role.enum';

export const Role = (...roles: RoleEnum[]) => SetMetadata(ROLE_METADATA, roles);
