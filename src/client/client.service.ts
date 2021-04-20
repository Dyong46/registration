import { Injectable } from "@nestjs/common";

import {
	ClientProxy,
	ClientProxyFactory,
	Transport
} from "@nestjs/microservices";

import { DataObject } from "src/types";

@Injectable()
export class ClientService {
	client: ClientProxy;

	constructor() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: process.env.HOST,
				port: +process.env.SERVICE_PORT
			}
		});
	}

	async send(pattern: string, payload: DataObject) {
		return await this.client
			.send<string, DataObject>(pattern, payload)
			.toPromise();
	}
}
