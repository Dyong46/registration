import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { capitalize } from "./helpers";

async function bootstrap() {
	const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
			options: {
				host: process.env.HOST,
				port: +process.env.POST
			}
		}
	);

	await app.listenAsync();
	Logger.log(
		`${capitalize(process.env.SERVICE)} service is listening on port ${
			process.env.HOST
		}:${process.env.PORT}`
	);
}

bootstrap();
