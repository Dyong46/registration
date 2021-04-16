import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ClientService } from "./client/client.service";
import { DataObject } from "./types";

@Controller()
export class AppController {
	constructor(private readonly clientService: ClientService) {}

	@MessagePattern("boilerplate.test")
	test(data: DataObject): DataObject {
		return data;
	}
}
