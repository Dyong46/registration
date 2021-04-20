import { Controller, Get } from "@nestjs/common";
import { getConnection } from "typeorm";

@Controller("")
export class HealthController {
	@Get()
	healthCheck() {
		const dbConnection = getConnection();

		return {
			instance: {
				env: process.env.NODE_ENV,
				project: process.env.PROJECT,
				region: process.env.REGION
			},
			service: {
				name: process.env.SERVICE,
				port: process.env.SERVICE_PORT
			},
			database: {
				name: process.env.DB_NAME,
				connection: dbConnection.name,
				connected: dbConnection.isConnected
			},
			port: process.env.PORT
		};
	}
}
