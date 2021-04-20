import { Injectable } from "@nestjs/common";

import {
	ClientProxy,
	ClientProxyFactory,
	Transport
} from "@nestjs/microservices";

@Injectable()
export class ClientService {
	self: ClientProxy;

	constructor() {
		this.self = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: process.env.HOST,
				port: +process.env.SERVICE_PORT
			}
		});
	}
}
