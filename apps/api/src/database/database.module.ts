import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service.js';
import { DatabaseController } from './database.controller.js';

@Global()
@Module({
    providers: [PrismaService],
    controllers: [DatabaseController],
    exports: [PrismaService],
})
export class DatabaseModule { }