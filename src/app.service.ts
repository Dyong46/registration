import { EmittedMessage } from "@algoan/pubsub";
import { Injectable, Logger } from "@nestjs/common";
import { EventData } from "./types";

@Injectable()
export class AppService {
	handleTestEvent(data: EmittedMessage<EventData>) {
		Logger.debug(data, "AppService::handleTestEvent");
		return data;
	}
}
