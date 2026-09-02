import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './prisma.service.js';

@Controller('health')
export class DatabaseController {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    @Get('database')
    async checkDatabase() {
        const healthCheckRows =
            await this.prisma.healthCheck.count();

        return {
            status: 'ok',
            database: 'connected',
            healthCheckRows,
        };
    }
}