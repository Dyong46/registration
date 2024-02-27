import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import * as Package from "../package.json";

@Injectable()
export class AppService {
	constructor(@InjectConnection() private readonly connection: Connection) {}

	get() {
		return {
			package: {
				version: Package.version,
				name: Package.name,
				description: Package.description
			},
			service: {
				name: process.env.SERVICE,
				port: process.env.PORT
			},
			database: {
				url: process.env.MONGO_URL,
				name: process.env.MONGO_NAME,
				connected: this.connection.readyState === 1
			}
		};
	}
}
