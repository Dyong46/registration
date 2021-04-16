import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			envFilePath: ["env/local.env", "env/development.env", "env/production.env"]
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [],
			synchronize: true
		})
	],
	controllers: [AppController]
})
export class AppModule {}
