import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UploadModule } from '../upload/upload.module';
import { UserRepo } from './user.repo';

@Module({
  imports: [DatabaseModule, UploadModule],
  controllers: [UserController],
  providers: [UserService, UserRepo, ...userProviders],
  exports: [UserService, UserRepo],
})
export class UserModule {}
