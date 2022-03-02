import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from "@nestjs/common";

import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
	AccountGuard,
	LogMiddleware,
	MessageInterceptor,
	MicroserviceModule
} from "@plogg-rely/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import ormConfig from "./ormconfig";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: AppModule.production()
				? ["env/production.env"]
				: ["env/local.env", "env/development.env"]
		}),
		TypeOrmModule.forRoot(ormConfig),
		MicroserviceModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccountGuard
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: MessageInterceptor
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
