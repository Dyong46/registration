import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ClientService } from "./client/client.service";
import { DataObject } from "./types";

@Controller()
export class AppController {
	constructor(private readonly clientService: ClientService) {
		Logger.debug("Starting test", "AppController::constructor");
		setTimeout(async () => {
			Logger.debug("Sending test", "AppController::constructor");

			await this.clientService.send("boilerplate.test", {
				message: `${process.env.SERVICE} test message`
			});

			Logger.debug("Test completed", "AppController::constructor");
		}, 2000);
	}

	@MessagePattern("boilerplate.test")
	test(data: DataObject): DataObject {
		Logger.debug(data, "AppController::test");
		return data;
	}
}
