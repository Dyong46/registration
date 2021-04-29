import { Controller, Post, Body } from "@nestjs/common";
import { MessageDto } from "@plogg-rely/microservices";

import { TestService } from "./test.service";

@Controller("test")
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Post()
	test(@Body() message: MessageDto) {
		return this.testService.test(message);
	}
}
