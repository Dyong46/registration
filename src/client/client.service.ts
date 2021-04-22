import { HttpService, Injectable, Logger } from "@nestjs/common";
import { DataObject, Message } from "../messages/message.interface";

@Injectable()
export class ClientService {
	private readonly logger = new Logger("ClientService");
	services: DataObject;

	constructor(private readonly http: HttpService) {}

	async getServiceUrl(service: string): Promise<string> {
		if (!this.services || !this.services[service]) {
			try {
				const res = await this.http.get(process.env.BASE_URL).toPromise();
				this.services = res.data.services;
			} catch (err) {
				this.logger.error(err);
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
