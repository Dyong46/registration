import { INestMicroservice, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GCPubSubServer } from "@algoan/nestjs-google-pubsub-microservice";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { GooglePubSubOptions } from "@algoan/pubsub";

async function bootstrap() {
	const pubSubOptions: GooglePubSubOptions = {
		projectId: process.env.PROJECT,
				subscriptionsPrefix: process.env.SERVICE,
		topicsPrefix: process.env.SERVICE,
		topicsSeparator: "."
	};

	const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			strategy: new GCPubSubServer(pubSubOptions)
		}
	);

	await app.listen(() => Logger.log(`${process.env.SERVICE} listening`, "main"));
}

bootstrap();
