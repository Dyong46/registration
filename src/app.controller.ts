import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ClientService } from "./client/client.service";
import { DataObject } from "./types";

@Controller()
export class AppController {
	constructor(private readonly clientService: ClientService) {
		setTimeout(async () => {
			await this.runTest();
		}, 2000);
	}

	async runTest() {
		const reply = await this.clientService.self
			.send(`${process.env.SERVICE}.test`, {
				message: `${process.env.SERVICE} test message`
			})
			.toPromise();

		Logger.debug(reply, "AppController::constructor");
	}

	@MessagePattern("boilerplate.test")
	test(data: DataObject): DataObject {
		Logger.debug(data, "AppController::test");
		return data;
	}
}
