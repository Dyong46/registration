import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	if (process.env.NODE_ENV === "production") {
		process.env.NO_COLOR = "true";
	}

	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT);

	Logger.log(
		`Service running on port ${process.env.PORT}`,
		"AppController::bootstrap"
	);
}

bootstrap();
