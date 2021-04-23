import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import * as Package from "../package.json";
import { TestService } from "./test/test.service";

@Injectable()
export class AppService {
	constructor(private readonly testService: TestService) {
		setInterval(() => {
			this.testService.selfTest();
		}, 5000);
	}

	get() {
		const dbConnection = getConnection();

		return {
			package: {
				version: Package.version,
				name: Package.name,
				description: Package.description
			},
			service: {
				name: process.env.service,
				port: process.env.port
			},
			database: {
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				name: process.env.DB_NAME,
				connected: dbConnection?.isConnected
			}
		};
	}
}
