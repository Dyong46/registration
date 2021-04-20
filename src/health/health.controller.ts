import { Controller, Get } from "@nestjs/common";

@Controller("")
export class HealthController {
	@Get()
	healthCheck() {
		return {
			service: {
				name: process.env.SERVICE,
				port: process.env.SERVICE_PORT
			},
			database: {
				name: process.env.DB_NAME,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				user: process.env.DB_USER
			},
			port: process.env.PORT
		};
	}
}
