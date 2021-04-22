import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const logger = new Logger("main");

async function bootstrap() {
	if (process.env.NODE_ENV === "production") {
		process.env.NO_COLOR = "true";
	}

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(process.env.SERVICE);
	await app.listen(process.env.PORT);
	logger.log(`${process.env.SERVICE} on port ${process.env.PORT}`);
}

bootstrap();
