import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const production = process.env.NODE_ENV === "production";

dotenv.config({
	path: production ? "./env/production.env" : "./env/development.env"
});

export default {
	name: "default",
	type: "mysql",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	timezone: "+00:00",
	entities: ["./dist/**/*.entity.js"],
	logging: !!Number(process.env.TYPEORM_DEBUG),
	maxQueryExecutionTime: 5000,
	retryAttempts: Infinity,
	retryDelay: 5000,
	synchronize: false,
	migrations: ["dist/src/migrations/*.js"],
	migrationsTableName: "typeorm",
	migrationsRun: true,
	charset: "utf8mb4"
} as TypeOrmModuleOptions;
