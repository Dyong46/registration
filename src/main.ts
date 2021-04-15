import { GooglePubSubOptions } from "@algoan/pubsub";
import { INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GCPubSubServer } from "@algoan/nestjs-google-pubsub-microservice";
import { AppModule } from "./app.module";

async function bootstrap() {
	const options: GooglePubSubOptions = {
		projectId: "test",
		subscriptionsPrefix: "test-app"
	};

	const app: INestMicroservice = await NestFactory.create(AppModule, {
		strategy: new GCPubSubServer(options)
	});

	await app.listen(() => console.log("Server running!"));
}
bootstrap();
