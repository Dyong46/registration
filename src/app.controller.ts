import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ClientService } from "./client/client.service";
import { DataObject } from "./types";

@Controller()
export class AppController {
	constructor(private readonly clientService: ClientService) {
		setTimeout(async () => {
			Logger.log("Sending message", "AppController");

			const response = await this.clientService.send("boilerplate.test", {
				message: "Hello World!"
			});

			Logger.log(response, "AppController");
		}, 2000);
	}

	@MessagePattern("boilerplate.test")
	test(data: DataObject): DataObject {
		return data;
	}
}
