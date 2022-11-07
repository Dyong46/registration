import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountGuard } from "./microservices/auth/account.guard";
import { LogMiddleware } from "./microservices/log.middleware";
import { MessageInterceptor } from "./microservices/message.interceptor";
import { MicroserviceModule } from "./microservices/microservice/microservice.module";
import { RelyThrottlerGuard } from "./microservices/throttler/throttler.guard";
import { RelyThrottlerModule } from "./microservices/throttler/throttler.module";
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
		RelyThrottlerModule.forRoot({
			limit: 100,
			ttl: 60
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
		{
			provide: APP_GUARD,
			useClass: RelyThrottlerGuard
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
