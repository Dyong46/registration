import { BullModule } from "@nestjs/bull";
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountGuard } from "./microservices/auth/account.guard";
import { LogMiddleware } from "./microservices/log.middleware";
import { MessageInterceptor } from "./microservices/message.interceptor";
import { MicroserviceModule } from "./microservices/microservice/microservice.module";
import { RedisModule } from "./microservices/redis/redis.module";
import { RelyThrottlerGuard } from "./microservices/throttler/throttler.guard";
import { RelyThrottlerModule } from "./microservices/throttler/throttler.module";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: AppModule.production()
				? ["env/production.env"]
				: ["env/local.env", "env/development.env"]
		}),
		MongooseModule.forRoot(
			`${process.env.MONGO_URL}/${process.env.MONGO_NAME}?authSource=${process.env.MONGO_NAME}`,
			{
				dbName: process.env.MONGO_NAME,
				...(process.env.MONGO_USER && { user: process.env.MONGO_USER }),
				...(process.env.MONGO_PASSWORD && { pass: process.env.MONGO_PASSWORD })
			}
		),
		RelyThrottlerModule.forRoot({
			limit: 100,
			ttl: 60
		}),
		EventEmitterModule.forRoot({
			// set this to `true` to use wildcards
			wildcard: false,
			// the delimiter used to segment namespaces
			delimiter: ".",
			// set this to `true` if you want to emit the newListener event
			newListener: false,
			// set this to `true` if you want to emit the removeListener event
			removeListener: false,
			// the maximum amount of listeners that can be assigned to an event
			maxListeners: 10,
			// show event name in memory leak message when more than maximum amount of listeners is assigned
			verboseMemoryLeak: false,
			// disable throwing uncaughtException if an error event is emitted and it has no listeners
			ignoreErrors: false
		}),
		RedisModule,
		MicroserviceModule,
		ProductsModule
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
