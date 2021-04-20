import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { DataObject } from "./types";
import { AppController } from "./app.controller";
import { ClientModule } from "./client/client.module";
import { HealthModule } from "./health/health.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			envFilePath: ["env/local.env", "env/development.env", "env/production.env"]
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				let extra: DataObject;

				if (process.env.NODE_ENV === "production") {
					extra = {
						socketPath: `/cloudsql/${process.env.PROJECT}:${process.env.REGION}:${process.env.SQL_SERVER}`
					};
				}

				const dbConfig: TypeOrmModuleOptions = {
					type: "mysql",
					host: process.env.DB_HOST,
					port: +process.env.DB_PORT,
					username: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_NAME,
					entities: ["./**/*.entity.ts"],
					logging: "all",
					maxQueryExecutionTime: 5000,
					retryAttempts: Infinity,
					retryDelay: 5000,
					extra
				};

				return dbConfig;
			}
		}),
		ClientModule,
		HealthModule
	],
	controllers: [AppController]
})
export class AppModule {}
