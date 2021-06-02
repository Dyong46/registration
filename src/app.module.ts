import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from "@nestjs/common";

import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
	AccountGuard,
	LogMiddleware,
	MicroserviceModule
} from "@plogg-rely/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestModule } from "./test/test.module";

import ormConfig from "./ormconfig";

@Module({
	imports: [
		MicroserviceModule.forRoot(),
		ConfigModule.forRoot({
			cache: true,
			envFilePath: ["env/local.env", "env/development.env", "env/production.env"]
		}),
		TypeOrmModule.forRoot(ormConfig),
		TestModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccountGuard
		},
		AppService
	]
})
export class AppModule implements NestModule {
	public static production(): boolean {
		return process.env.NODE_ENV === "production";
	}

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LogMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL
		});
	}
}
