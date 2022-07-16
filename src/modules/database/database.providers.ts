import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://rezavr1183:rezajoon84@cluster0.pio7b.mongodb.net/ushop?retryWrites=true&w=majority',
      ),
  },
];
