import { Injectable, Logger } from "@nestjs/common";
import { MessageDto, MicroserviceService } from "@plogg-rely/microservices";
import { TestEntity } from "./entities/test.entity";

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

	async test(message: MessageDto) {
		await TestEntity.insert({
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
