import { EmittedMessage } from "@algoan/pubsub";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { EventData } from "./types";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@EventPattern("test")
	public async handleTestEvent(@Payload() data: EmittedMessage<EventData>) {
		return this.appService.handleTestEvent(data);
	}
}
