import { Injectable, Logger } from "@nestjs/common";
import { Message, MicroserviceService } from "@plogg-rely/microservices";
import testEntity from "./entities/test.entity";

@Injectable()
export class TestService {
	private readonly logger = new Logger("TestService");

	constructor(private readonly client: MicroserviceService) {}

	async selfTest() {
		const res = await this.client.send(process.env.SERVICE, "test");

		if (res?.data?.test === "OK") {
			this.logger.log("Test success");
		} else {
			this.logger.error("Test failed");
		}
	}

	async test(message: Message) {
		message = this.client.receive(message);

		await testEntity.insert({
			at: new Date()
		});

		return {
			...message,
			data: {
				test: "OK"
			}
		};
	}
}
