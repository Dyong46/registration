import { Controller, Get } from "@nestjs/common";

@Controller("")
export class HealthController {
	@Get()
	healthChech() {
		return {
			service: process.env.SERVICE,
			port: process.env.PORT,
			database_name: process.env.DB_NAME,
			health_port: process.env.HEALTH_PORT
		};
	}
}
