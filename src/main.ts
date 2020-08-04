import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: process.env.SECRET || '$3Cr3T',
      name: 'soil-analysis-api',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
