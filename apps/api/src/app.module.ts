import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { fileURLToPath } from 'node:url';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';

const databaseEnvPath = fileURLToPath(
  new URL('../../../packages/database/.env', import.meta.url),
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      envFilePath: databaseEnvPath,

      ignoreEnvFile:
        process.env.CI === 'true' ||
        process.env.NODE_ENV === 'production',
    }),

    DatabaseModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}