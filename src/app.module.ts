import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogMiddleware, MicroserviceModule } from "@plogg-rely/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";

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
			entities: ["./**/*.entity.ts"],
			logging: "all",
			maxQueryExecutionTime: 5000,
			retryAttempts: Infinity,
			retryDelay: 5000
		}),
		MicroserviceModule.forRoot({}),
		TestModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LogMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL
		});
	}
}
