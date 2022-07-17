import { DocumentBuilder } from '@nestjs/swagger';

export const { MONGO_URI } = process.env;

// --- SWAGGER CONFIG
export const swaggerConfig = new DocumentBuilder()
  .setTitle('UShop API')
  .setDescription('An online shop api.')
  .setVersion('0.1')
  .build();
