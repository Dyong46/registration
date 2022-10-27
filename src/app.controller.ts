import { Controller, Get } from "@nestjs/common";
import { Public } from "./microservices/auth/public.decorator";
import { AppService } from "./app.service";

@Controller("")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get("")
	get() {
		return this.appService.get();
	}
}
