import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ClientService } from "./client/client.service";
import { DataObject } from "./types";

@Controller()
export class AppController {
	constructor(private readonly client: ClientService) {
		setTimeout(async () => {
			await this.runTest();
		}, 2000);
	}

	async runTest() {
		const reply = await this.client.self
			.send("boilerplate.test", {
				message: `${process.env.SERVICE} test message`
			})
			.toPromise();

		Logger.debug(reply.message, "AppController::constructor");
	}

	@MessagePattern("boilerplate.test")
	test(data: DataObject): DataObject {
		return data;
	}
}
