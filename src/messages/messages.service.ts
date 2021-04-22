import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ClientService } from "../client/client.service";
import { Message } from "../message.interface";

@Injectable()
export class MessagesService {
	constructor(private readonly client: ClientService) {}

	async sendTest() {
		const res = await this.client.send(process.env.SERVICE, "test", {});

		if (res?.data?.message === "OK") {
			Logger.log("Test success");
		} else {
			Logger.error("Test failed");
		}
	}

	async test(message: Message) {
		message.data = {
			message: "OK"
		};
	}

	async receive(message: Message) {
		message.ack = true;
		message.received = new Date();

		if (this[message.action]) {
			message.status = HttpStatus.ACCEPTED;
			message.data = await this[message.action](message);
		} else {
			message.status = HttpStatus.NOT_FOUND;
		}

		return message;
	}
}
