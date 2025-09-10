"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Envs = void 0;
exports.Envs = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'postgres',
        migrationRun: false,
    },
};
