import * as express from "express";
import * as helmet from "helmet";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as Package from "../package.json";
import { swaggerOptions } from "./swagger";
import axios from "axios";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});

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

	app.use(helmet());
	app.setGlobalPrefix(process.env.SERVICE);

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

	// Test a micro-service transaction
	const message = axios.create({
		baseURL: `http://${process.env.HOST}:${process.env.PORT}/${process.env.SERVICE}`,
		headers: {
			"Authorization": "Bearer tbd",
			"User-Agent": `rely-${process.env.SERVICE}`
		}
	});

	const response = await message.get("/");
	Logger.debug(response.data, "Axios Test");
}

bootstrap();
