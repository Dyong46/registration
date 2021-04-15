import {
	EmitOptions,
	GCListenOptions,
	GCPubSub,
	PubSubFactory,
	Transport
} from "@algoan/pubsub";

import { Injectable } from "@nestjs/common";

import { DataObject } from "../types";

@Injectable()
export class PubSubService {
	private pubSub: GCPubSub = PubSubFactory.create({
		transport: Transport.GOOGLE_PUBSUB,
		options: {
			projectId: process.env.PROJECT,
			debug: process.env.NODE_ENV !== "production"
		}
	});

	async emit(
		event: string,
		data: DataObject,
		options?: EmitOptions<GCListenOptions>
	): Promise<string> {
		return this.pubSub.emit(event, data, options);
	}
}
