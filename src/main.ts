import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GCPubSubServer } from "@algoan/nestjs-google-pubsub-microservice";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
	const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			strategy: new GCPubSubServer({
				projectId: process.env.PROJECT,
				subscriptionsPrefix: `rely-${process.env.SERVICE}`
			})
		}
	);

	await app.listen(() => Logger.log(`${process.env.SERVICE} listening`, "main"));
}

bootstrap();
