import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';

export { PrismaClient };

const databasePackageRoot = fileURLToPath(
    new URL('../..', import.meta.url),
);

export function createPrismaAdapter(databaseUrl: string) {
    const url = new URL(databaseUrl);

    if (url.protocol !== 'mysql:') {
        throw new Error(
            `DATABASE_URL debe utilizar mysql://. Recibido: ${url.protocol}`,
        );
    }

    const database = decodeURIComponent(
        url.pathname.replace(/^\//, ''),
    );

    if (!database) {
        throw new Error('DATABASE_URL no contiene el nombre de la base de datos.');
    }

    const sslCert = url.searchParams.get('sslcert');

    const ssl = sslCert
        ? {
            ca: readFileSync(
                resolve(databasePackageRoot, sslCert),
                'utf8',
            ),
        }
        : url.searchParams.has('sslaccept')
            ? true
            : undefined;

    return new PrismaMariaDb({
        host: url.hostname,
        port: url.port ? Number(url.port) : 3306,

        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),

        database,

        connectionLimit: 5,

        ...(ssl ? { ssl } : {}),
    });
}