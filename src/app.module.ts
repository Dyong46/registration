import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PubSubService } from "./pubsub/pubsub.service";
import { PubSubModule } from "./pubsub/pubsub.module";

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
		}),
		PubSubModule
	],
	controllers: [AppController],
	providers: [AppService, PubSubService, PubSubService]
})
export class AppModule {}
