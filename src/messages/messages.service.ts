import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ClientService } from "../client/client.service";
import { Message } from "./message.interface";

@Injectable()
export class MessagesService {
	private readonly logger = new Logger("MessagesService");

	constructor(private readonly client: ClientService) {}

	async sendTest() {
		const res = await this.client.send(process.env.SERVICE, "test");

		if (res?.data?.test === "OK") {
			this.logger.log("Test success");
		} else {
			this.logger.error("Test failed");
		}
	}

	async test(message: Message) {
		return {
			...message,
			data: {
				test: "OK"
			}
		};
	}

	async receive(message: Message) {
		message.ack = true;
		message.received = new Date();

		if (this[message.action]) {
			message.status = HttpStatus.ACCEPTED;
			message = await this[message.action](message);
		} else {
			message.status = HttpStatus.NOT_FOUND;
		}

		return message;
	}
}
