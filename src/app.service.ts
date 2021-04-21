import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import * as Package from "../package.json";

@Injectable()
export class AppService {
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
				name: process.env.DB_NAME,
				connected: dbConnection.isConnected
			}
		};
	}
}
