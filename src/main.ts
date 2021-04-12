import { join } from "path";
import * as express from "express";
import * as helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as Package from "../package.json";
import { swaggerOptions } from "./swagger";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});

	// Augment express limits
	app.use(
		express.json({
			limit: "8mb"
		})
	);

	app.use(
		express.urlencoded({
			limit: "8mb",
			extended: true
		})
	);

	// Setup Helmet
	app.use(helmet());

	// Set global prefix to /api when in production
	app.setGlobalPrefix(process.env.SERVICE);

	// Server static assets
	app.useStaticAssets(join(__dirname, "../..", "assets"));

	// Pipes
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	);

	// Swagger setup
	const config = new DocumentBuilder()
		.setTitle(`${process.env.SERVICE} service`)
		.setDescription("Rely micro services boilerplate")
		.setVersion(Package.version)
		.setBasePath(process.env.SERVICE)
		.addBearerAuth({
			in: "header",
			type: "http"
		})
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(
		`${process.env.SERVICE}/docs`,
		app,
		document,
		swaggerOptions
	);

	await app.listen(process.env.PORT);
}
bootstrap();
