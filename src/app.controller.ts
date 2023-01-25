import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { Public } from "./microservices/auth/public.decorator";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	get() {
		return this.appService.get();
	}
}
