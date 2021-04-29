import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const logger = new Logger("main");

async function bootstrap() {
	if (process.env.NODE_ENV === "production") {
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
		})
	);

	// Listen
	await app.listen(process.env.PORT);
	logger.log(`${process.env.SERVICE} on port ${process.env.PORT}`);
}

bootstrap();
