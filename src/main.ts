import * as apm from "elastic-apm-node";

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { ReceiveMessagePipe } from "./microservices/message.pipe";

import { AppModule } from "./app.module";

apm.start({
	active: process.env.NODE_ENV === "production"
});

const logger = new Logger("main");

async function bootstrap() {
	if (AppModule.production()) {
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

	// Listen
	await app.listen(process.env.PORT, "0.0.0.0");
	logger.log(`Service ${process.env.SERVICE} on ${await app.getUrl()}`);
}

bootstrap();
