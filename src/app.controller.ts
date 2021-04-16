import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { DataObject } from "./types";

@Controller()
export class AppController {
	@MessagePattern(`${process.env.SERVICE}.test`)
	public async test(data: DataObject): Promise<DataObject> {
		Logger.debug(data, "AppController::test");
		return data;
	}
}
