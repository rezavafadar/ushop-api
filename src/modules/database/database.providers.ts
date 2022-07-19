import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION_TOKEN } from '../../constants';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: DATABASE_CONNECTION_TOKEN,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('MONGO_URI')),
  },
];
