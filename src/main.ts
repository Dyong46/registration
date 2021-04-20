import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { capitalize } from "./helpers";
import { HealthModule } from "./health/health.module";

async function bootstrap() {
	if (process.env.NODE_ENV === "production") {
		process.env.NO_COLOR = "true";
	}

	const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
			options: {
				host: process.env.HOST,
				port: +process.env.SERVICE_PORT
			}
		}
	);

	await app.listenAsync();

	Logger.log(
		`${capitalize(process.env.SERVICE)} service is listening on port ${
			process.env.HOST
		}:${process.env.SERVICE_PORT}`
	);

	const healthCheck = await NestFactory.create(HealthModule);
	await healthCheck.listen(process.env.PORT);
	Logger.log(`Health check service running on port ${process.env.PORT}`);
}

bootstrap();
