import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

dotenv.config({ path: "./env/development.env" });

export default {
	type: "mysql",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ["./dist/**/*.entity.js"],
	logging: process.env.NODE_ENV !== "production",
	maxQueryExecutionTime: 5000,
	retryAttempts: Infinity,
	retryDelay: 5000,
	synchronize: false,
	migrations: ["dist/src/migrations/*.js"],
	migrationsTableName: "typeorm",
	migrationsRun: true
} as TypeOrmModuleOptions;
