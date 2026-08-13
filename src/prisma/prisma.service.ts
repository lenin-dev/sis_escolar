import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor() {
        const adapter = new PrismaMariaDb({
            host: 'localhost',
            user: 'root',
            password: 'Delaoserna2411',
            database: 'sis_escolar',
            port: 3306,
        });

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

}
