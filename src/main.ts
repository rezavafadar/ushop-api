import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdaptorHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdaptorHost));

  await app.listen(3000);
}
bootstrap();
