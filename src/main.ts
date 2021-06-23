import * as DebugAgent from "@google-cloud/debug-agent";

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import {
	MessageInterceptor,
	ReceiveMessagePipe
} from "@plogg-rely/microservices";

import { AppModule } from "./app.module";

const logger = new Logger("main");

async function bootstrap() {
	if (AppModule.production()) {
		DebugAgent.start();
		process.env.NO_COLOR = "true";
	}

	const app = await NestFactory.create(AppModule);

	// Service URL prefix
	app.setGlobalPrefix(process.env.SERVICE);

	// Pipes
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true
		}),
		new ReceiveMessagePipe()
	);

	// Interceptors
	app.useGlobalInterceptors(new MessageInterceptor());

	// Listen
	await app.listen(process.env.PORT);
	logger.log(`Service ${process.env.SERVICE} on ${await app.getUrl()}`);
}

bootstrap();
