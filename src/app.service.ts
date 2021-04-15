import { EmittedMessage } from "@algoan/pubsub";
import { Injectable, Logger } from "@nestjs/common";
import { PubSubService } from "./pubsub/pubsub.service";
import { EventData } from "./types";

@Injectable()
export class AppService {
	constructor(private readonly pubSub: PubSubService) {
		this.sendtest();
	}

	async sendtest() {
		await this.pubSub.emit("boilerplate.test", {
			foo: "bar"
		});
	}

	handleTestEvent(data: EmittedMessage<EventData>) {
		Logger.debug(data.payload, "AppService::handleTestEvent");
		return data.payload;
	}
}
