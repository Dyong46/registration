import { HttpService, Injectable, Logger } from "@nestjs/common";
import { DataObject, Message } from "../messages/message.interface";

export const MAX_CACHE_AGE = 60000;

@Injectable()
export class ClientService {
	private readonly logger = new Logger("ClientService");
	services: DataObject;
	cached: Date;

	constructor(private readonly http: HttpService) {}

	cacheAge() {
		return new Date().getTime() - (this.cached?.getTime() || 0);
	}

	async getServiceUrl(service: string): Promise<string> {
		if (
			!this.services ||
			!this.services[service] ||
			this.cacheAge() > MAX_CACHE_AGE
		) {
			try {
				const res = await this.http.get(process.env.BASE_URL).toPromise();
				this.services = res.data.services;
				this.cached = new Date();
				this.logger.warn("Updated service url cache");
			} catch (err) {
				this.logger.error(`Could not retrieve service urls: ${err}`);
				return;
			}
		}

		return `${this.services[service]}/messages`;
	}

	async send(
		service: string,
		action: string,
		data?: DataObject
	): Promise<Message> {
		const url = await this.getServiceUrl(service);

		if (url) {
			const message: Message = {
				sent: new Date(),
				sender: process.env.SERVICE,
				action,
				data
			};

			try {
				const res = await this.http.post(url, message).toPromise();
				return res?.data;
			} catch (err) {
				this.logger.error(`Problem sending to ${url}: ${err}`);
				this.logger.warn("Resetting service url cache");
				this.services = {};
			}
		} else {
			this.logger.error(`Unknown base url for ${service}`);
		}
	}
}
