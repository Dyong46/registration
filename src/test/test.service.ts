import { Injectable, Logger } from "@nestjs/common";
import { ClientService } from "../client/client.service";
import { Message } from "../message.interface";

@Injectable()
export class TestService {
	private readonly logger = new Logger("TestService");

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
		message = this.client.receive(message);

		return {
			...message,
			data: {
				test: "OK"
			}
		};
	}
}
