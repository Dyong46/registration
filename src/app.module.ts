import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { ClientModule } from "./client/client.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			envFilePath: ["env/local.env", "env/development.env", "env/production.env"]
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async () => ({
				type: "mysql",
				host: process.env.DB_HOST,
				port: +process.env.DB_PORT,
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				entities: ["./**/*.entity.ts"],
				logging: "all",
				maxQueryExecutionTime: 5000,
				retryAttempts: Infinity
			})
		}),
		ClientModule
	],
	controllers: [AppController]
})
export class AppModule {}
