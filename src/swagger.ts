import * as fs from "fs";
import { join } from "path";
import { SwaggerCustomOptions } from "@nestjs/swagger";

const css: string = fs
	.readFileSync(
		join(__dirname, "../..", "assets", "css", "swagger-material.css")
	)
	.toString();

export const swaggerOptions: SwaggerCustomOptions = {
	customCss: css,
	swaggerOptions: {
		docExpansion: "none",
		displayRequestDuration: true,
		filter: false,
		tagsSorter: "alpha",
		operationsSorter: "alpha",
		tryItOutEnabled: true,
		persistAuthorization: true
	}
};
