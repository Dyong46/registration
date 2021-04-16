import { EmittedMessage } from "@algoan/pubsub";
import { Injectable, Logger } from "@nestjs/common";
import { PubSubService } from "./pubsub/pubsub.service";
import { EventData } from "./types";

@Injectable()
export class AppService {
	constructor(private readonly pubSub: PubSubService) {
		this.sendTest();
	}

	async sendTest() {
		await this.pubSub.emit("boilerplate.test", {
			foo: "bar"
		}, {
			metadata: {
				reply: `${process.env.SERVICE}.test.reply`
			}
		});
	}

	handleTestEvent(data: EmittedMessage<EventData>) {
		Logger.debug(data.payload, "AppService::handleTestEvent");
		Logger.debug(data.metadata, "AppService::handleTestEvent");
		return data.payload;
	}

	handleTestReplyEvent(data: EmittedMessage<EventData>) {
		Logger.debug(data.payload, "AppService::handleTestReplyEvent");
		return data.payload;
	}
}
