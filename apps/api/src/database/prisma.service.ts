import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
    createPrismaAdapter,
    PrismaClient,
} from 'database';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        const databaseUrl =
            configService.getOrThrow<string>('DATABASE_URL');

        const adapter = createPrismaAdapter(databaseUrl);

        super({
            adapter,
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}